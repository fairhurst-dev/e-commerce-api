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
  makeDeleteOrderInput,
  makeDeleteCartInput,
} from "./utils.js";
import { transformCartForClient, scrubKeys } from "#lib/transformers.js";
import { andThen, prop, pipe, tap, omit, map, any, propEq } from "ramda";
import { randomUUID } from "crypto";
import {
  createPaymentIntent,
  updatePaymentIntent,
  removePaymentIntent,
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

export const checkout = {
  /*delete cart*/
};

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(prop("Attributes"))
);

const upsertCart = pipe(makeUpsertCartInput, put);

const itemIsInCart = (cart, newCartItem) =>
  cart.items.some((i) => i.id === newCartItem.id);

const removeCart = pipe(makeDeleteCartInput, remove);

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

  return pipe(makeUpsertCartItemInput, put, andThen(prop("Attributes")))(input);
};

export const deleteCartItem = pipe(makeDeleteCartItemInput, remove);

const resetOrder = async (order) => {
  await removeCart(order);
  await removePaymentIntent(order);
  return pipe(makeDeleteOrderInput, remove)(order);
};

export const updateOrder = async (cart, order) => {
  if (!cart.items.length) {
    return resetOrder(order);
  }

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
    cartUUID: cart.cartUUID,
    userUUID: cart.userUUID,
  });
  console.log("my order", order);
  if (!order) {
    return createOrder(cart);
  }
  return updateOrder(cart, order);
};
