import { andThen, tap, pipe, update, path } from "ramda";
import { stripe } from "./client.js";
import {
  makePaymentIntentFromCart,
  updatePaymentIntentFromCart,
} from "./utils.js";

const sendCreatePIparams = (params) => stripe.paymentIntents.create(params);

const sendUpdatePIparams = (pi, params) =>
  stripe.paymentIntents.update(pi, params);

const sendRemovePIparams = (pi) => stripe.paymentIntents.cancel(pi);

export const createPaymentIntent = pipe(
  makePaymentIntentFromCart,
  sendCreatePIparams
);

export const updatePaymentIntent = async (cart, order) => {
  const params = updatePaymentIntentFromCart(cart);
  const pi = order.paymentIntent.id;
  return sendUpdatePIparams(pi, params);
};

export const removePaymentIntent = pipe(
  path(["paymentIntent", "id"]),
  sendRemovePIparams
);
