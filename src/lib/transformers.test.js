import { describe, it } from "node:test";
import assert from "node:assert";
import { transformCartForClient } from "./transformers.js";
import { cartItemSample } from "#lib/samples/domain.js";

describe("Transformers", () => {
  it("should transform cart for client", () => {
    const actual = transformCartForClient([
      {
        PK: "USER#123",
        SK: "CART#ITEM#1b4e28ba-2fa1-11d2-883f-0016d3cca42",
        ...cartItemSample,
      },
      {
        PK: "USER#123",
        SK: "CART#83d8fe05-b204-46ea-86bd-f0ef703809bb",
        cartUUID: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
        userUUID: "123",
      },
    ]);
    assert.deepEqual(actual, {
      cartUUID: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
      userUUID: "123",
      items: [cartItemSample],
      total: 3000,
      quantity: 3,
      formattedTotal: "$30.00",
    });
  });
});
