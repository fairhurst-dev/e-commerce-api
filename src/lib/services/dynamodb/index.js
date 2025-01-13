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
} from "./utils.js";
import { transformCartForClient, scrubKeys } from "#lib/transformers.js";
import { andThen, prop, pipe, tap, omit, map, any, propEq } from "ramda";
import { randomUUID } from "crypto";
import {
  createPaymentIntent,
  updatePaymentIntent,
} from "#lib/services/stripe/index.js";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);
const remove = (params) => docClient.delete(params);
const query = (params) => docClient.query(params);

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(tap(console.log), prop("Item"), scrubKeys))
);

export const getCartItem = pipe(
  makeGetCartItemInput,
  get,
  andThen(pipe(tap(console.log), prop("Item"), scrubKeys))
);

export const getCart = pipe(
  makeGetCartInput,
  query,
  andThen(pipe(tap(console.log), pipe(prop("Items"), transformCartForClient)))
);

export const getOrder = pipe(
  makeGetOrderInput,
  get,
  andThen(pipe(tap(console.log), prop("Item"), scrubKeys))
);

export const getOrders = pipe(
  makeGetOrdersInput,
  query,
  andThen(pipe(tap(console.log), pipe(prop("Items"), map(scrubKeys))))
);

export const checkout = {
  /*delete cart*/
};

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

const upsertCart = pipe(makeUpsertCartInput, put);

const itemIsInCart = (cart, newCartItem) =>
  cart.items.some((i) => i.id === newCartItem.id);

export const upsertCartItem = async (input) => {
  const cart = await getCart(input.userUUID);

  console.log("cart", cart);

  if (itemIsInCart(cart, input)) {
    throw new Error("Item is already in cart");
  }

  if (!cart.cartUUID) {
    const cartUUID = randomUUID();
    await upsertCart({ userUUID: input.userUUID, cartUUID });
  }

  return pipe(
    makeUpsertCartItemInput,
    tap(console.log),
    put,
    andThen(pipe(tap(console.log), prop("Attributes")))
  )(input);
};

export const deleteCartItem = pipe(
  makeGetCartItemInput,
  remove,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const updateOrder = async (cart, order) => {
  const paymentIntent = await updatePaymentIntent(cart, order);
  const orderInput = makeUpsertOrderInput({ paymentIntent, ...cart });
  return put(orderInput);
};

const createOrder = async (cart) => {
  const paymentIntent = await createPaymentIntent(cart);
  const orderInput = makeUpsertOrderInput({ paymentIntent, ...cart });
  return put(orderInput);
};

export const ensureOrder = async (cartItem) => {
  const cart = await getCart(cartItem.userUUID);
  const order = await getOrder({
    orderUUID: cart.cartUUID,
    userUUID: cart.userUUID,
  });
  if (!order) {
    return createOrder(cart);
  }
  return updateOrder(cart, order);
};
