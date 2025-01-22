import { describe, it } from "node:test";
import assert from "node:assert";
import { makeSessionParams } from "./utils.js";
import { cartSample, cartItemSample } from "#lib/samples/domain.js";

describe("stripe utils", () => {
  it("should format make session params", () => {
    const actual = makeSessionParams({
      ...cartSample,
      items: [cartItemSample],
    });
    assert.deepEqual(actual, {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "product",
              description: "description",
            },
            unit_amount: 1000,
          },
          quantity: 3,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
      metadata: {
        userUUID: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
        cartUUID: "3dd210bf-59df-438f-b50c-2b1dcd08d8b5",
      },
    });
  });
});
