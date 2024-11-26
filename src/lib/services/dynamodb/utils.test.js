import { describe, it } from "node:test";
import assert from "node:assert";
import { makeUpsertProductInput, makeGetProductInput, makeUpsertCartInput, makeGetCartInput } from "./utils.js";

describe("Dynamo utils", () => {
  describe("product", () => {
    it("should create upsert product input", () => {
      const product = { id: "123", name: "Test Product" };
      const actual = makeUpsertProductInput(product);
      assert.deepStrictEqual(actual, {
        Item: { PK: "PRODUCT#123", ...product },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });

    it("should create get product input", () => {
      const productId = "123";
      const actual = makeGetProductInput(productId);
      assert.deepStrictEqual(actual, {
        Key: { PK: "PRODUCT#123" },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });
  });
  describe("cart", () => {
    it("should create upsert cart input", () => {
      const cart = { id: "456", items: ["item1", "item2"] };
      const actual = makeUpsertCartInput(cart);
      assert.deepStrictEqual(actual, {
        Item: { PK: "CART#456", ...cart },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });

    it("should create get cart input", () => {
      const cartId = "456";
      const actual = makeGetCartInput(cartId);
      assert.deepStrictEqual(actual, {
        Key: { PK: "CART#456" },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });
  });
});
