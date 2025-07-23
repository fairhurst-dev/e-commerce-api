import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetAllProductsInput,
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
  makeDecrementStockInput,
} from "./utils.js";
import { transformCartForClient, scrubKeys } from "#lib/transformers.js";
import { andThen, prop, pipe, map, curry } from "ramda";
import { randomUUID } from "crypto";
import { createCheckoutSession } from "#lib/services/stripe/index.js";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);
const remove = (params) => docClient.delete(params);
const query = (params) => docClient.query(params);
const update = (params) => docClient.update(params);

const multiDBAction = curry(async (dbFn, inputs) => {
  await Promise.all(
    inputs.map(async (input) => {
      return await dbFn(input);
    })
  );
});

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(prop("Item"), scrubKeys))
);

export const getProducts = pipe(
  makeGetAllProductsInput,
  query,
  andThen(pipe(prop("Items"), map(scrubKeys)))
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

export const upsertProduct = pipe(makeUpsertProductInput, put);

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

  return pipe(makeUpsertCartItemInput, put)(input);
};

export const deleteCartItem = pipe(makeDeleteCartItemInput, remove);

const decrementStock = pipe(
  map(makeDecrementStockInput),
  multiDBAction(update)
);

const postCheckoutCleanup = async (cart) => {
  await removeCartAndItems(cart);
  await decrementStock(cart.items);
};

export const createOrder = async (checkoutSession) => {
  const cart = await getCart(checkoutSession.metadata.userUUID);
  if (!cart.cartUUID) {
    console.error(checkoutSession);
    throw new Error("Cart does not exist");
  }

  const orderInput = makeUpsertOrderInput({ ...cart, checkoutSession });
  await put(orderInput);
  await postCheckoutCleanup(cart);
};

export const startCheckoutSession = pipe(
  createCheckoutSession,
  andThen(prop("url"))
);
