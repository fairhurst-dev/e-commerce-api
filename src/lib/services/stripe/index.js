import { andThen, tap, pipe, update } from "ramda";
import { stripe } from "./client.js";
import {
  makePaymentIntentFromCart,
  updatePaymentIntentFromCart,
} from "./utils.js";

const sendCreatePIparams = (params) => {
  console.log("my params", params);
  return stripe.paymentIntents.create(params);
};
const sendUpdatePIparams = (pi, params) => {
  console.log("my params", params);
  return stripe.paymentIntents.update(pi, params);
};

export const createPaymentIntent = pipe(
  makePaymentIntentFromCart,
  sendCreatePIparams,
  andThen(tap(console.log))
);

export const updatePaymentIntent = async (cart, order) => {
  const params = updatePaymentIntentFromCart(cart);
  const pi = order.paymentIntent.id;
  return sendUpdatePIparams(pi, params);
};
