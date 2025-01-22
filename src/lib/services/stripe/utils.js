import { applySpec, prop, always, pipe, map } from "ramda";

const makeStripeLineItem = applySpec({
  price_data: {
    currency: always("usd"),
    product_data: {
      name: prop("name"),
      description: prop("description"),
    },
    unit_amount: prop("price"),
  },
  quantity: prop("quantity"),
});

export const makeSessionParams = applySpec({
  line_items: pipe(prop("items"), map(makeStripeLineItem)),
  mode: always("payment"),
  success_url: always(`${process.env.DOMAIN}/success`),
  cancel_url: always(`${process.env.DOMAIN}/cancel`),
  metadata: {
    userUUID: prop("userUUID"),
    cartUUID: prop("cartUUID"),
  },
});
