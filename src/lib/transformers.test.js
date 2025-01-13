import { describe, it } from "node:test";
import assert from "node:assert";
import { transformCartForClient } from "./transformers.js";
import { cartItemSample } from "#lib/samples/domain.js";

describe("Transformers", () => {
  it("should transform cart for client", () => {
    const actual = transformCartForClient([
      {
        categories: ["Outdoor", "Kitchen"],
        description:
          "Insulated water bottle with a 750ml capacity and leak-proof design.",
        id: "83d8fe05-b204-46ea-86bd-f0ef703809bb",
        msrp: 19.99,
        name: "Stainless Steel Water Bottle",
        price: 14.99,
        sku: "WB-003",
        stock: 200,
      },
    ]);
    console.log("actual", actual);
  });
});
