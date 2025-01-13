import { applySpec, prop, always, path } from "ramda";

export const makePaymentIntentFromCart = applySpec({
  amount: prop("total"),
  currency: always("usd"),
  metadata: applySpec({
    orderUUID: prop("orderUUID"),
    userUUID: prop("userUUID"),
  }),
});

export const updatePaymentIntentFromCart = applySpec({
  amount: prop("total"),
});
