import { describe, it } from "node:test";
import assert from "node:assert";
import { transformCartForClient } from "./transformers.js";
import { cartItemSample } from "#lib/samples/domain.js";

describe("Transformers", () => {
  it("should transform cart for client", () => {
    const actual = transformCartForClient([
      {
        PK: "USER#123",
        SK: "CART#ITEM#83d8fe05-b204-46ea-86bd-f0ef703809bb",
        categories: ["Outdoor", "Kitchen"],
        description:
          "Insulated water bottle with a 750ml capacity and leak-proof design.",
        id: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
        msrp: 1999,
        name: "Stainless Steel Water Bottle",
        price: 1499,
        sku: "WB-003",
        stock: 200,
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
      items: [
        {
          categories: ["Outdoor", "Kitchen"],
          description:
            "Insulated water bottle with a 750ml capacity and leak-proof design.",
          id: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
          msrp: 1999,
          name: "Stainless Steel Water Bottle",
          price: 1499,
          sku: "WB-003",
          stock: 200,
        },
      ],
      subtotal: 1499,
      total: 1604,
      quantity: 1,
      formattedSubtotal: "$14.99",
      formattedTotal: "$16.04",
    });
  });
});
