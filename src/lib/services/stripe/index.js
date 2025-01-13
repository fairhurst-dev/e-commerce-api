import { pipe } from "ramda";
import { stripe } from "./client.js";
import { makeSessionParams } from "./utils.js";

const sendCreateCheckoutSessionParams = (params) =>
  stripe.checkout.sessions.create(params);

export const createCheckoutSession = pipe(
  makeSessionParams,
  sendCreateCheckoutSessionParams
);
