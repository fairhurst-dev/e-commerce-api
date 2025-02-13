import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
  makeUpsertCartItemInput,
  makeGetCartItemInput,
  makeGetOrderInput,
  makeGetOrdersInput,
  makeUpsertOrderInput,
  makeUpsertCartInput,
  makeDeleteCartItemInput,
  makeDeleteCartInput,
  itemIsInCart,
} from "./utils.js";
import { transformCartForClient, scrubKeys } from "#lib/transformers.js";
import { andThen, prop, pipe, map } from "ramda";
import { randomUUID } from "crypto";
import { createCheckoutSession } from "#lib/services/stripe/index.js";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);
const remove = (params) => docClient.delete(params);
const query = (params) => docClient.query(params);

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(prop("Item"), scrubKeys))
);

export const getCartItem = pipe(
  makeGetCartItemInput,
  get,
  andThen(pipe(prop("Item"), scrubKeys))
);

export const getCart = pipe(
  makeGetCartInput,
  query,
  andThen(pipe(pipe(prop("Items"), transformCartForClient)))
);

export const getOrder = pipe(
  makeGetOrderInput,
  get,
  andThen(pipe(prop("Item"), scrubKeys))
);

export const getOrders = pipe(
  makeGetOrdersInput,
  query,
  andThen(pipe(pipe(prop("Items"), map(scrubKeys))))
);

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(prop("Attributes"))
);

const upsertCart = pipe(makeUpsertCartInput, put);

const removeCartAndItems = async (cart) => {
  for (const item of cart.items) {
    const input = makeDeleteCartItemInput({
      cartUUID: cart.cartUUID,
      userUUID: cart.userUUID,
      ...item,
    });
    await remove(input);
  }
  const input = makeDeleteCartInput(cart);
  await remove(input);
};

export const upsertCartItem = async (input) => {
  const cart = await getCart(input.userUUID);

  if (itemIsInCart(cart, input)) {
    throw new Error("Item is already in cart");
  }

  if (!cart.cartUUID) {
    const cartUUID = randomUUID();
    await upsertCart({ userUUID: input.userUUID, cartUUID });
  }

  return pipe(makeUpsertCartItemInput, put, andThen(prop("Attributes")))(input);
};

export const deleteCartItem = pipe(makeDeleteCartItemInput, remove);

export const createOrder = async (checkoutSession) => {
  const cart = await getCart(checkoutSession.metadata.userUUID);
  if (!cart.cartUUID) {
    console.error(checkoutSession);
    throw new Error("Cart does not exist");
  }

  const orderInput = makeUpsertOrderInput({ ...cart, checkoutSession });
  await put(orderInput);
  await removeCartAndItems(cart);
};

export const startCheckoutSession = pipe(
  createCheckoutSession,
  andThen(prop("url"))
);
