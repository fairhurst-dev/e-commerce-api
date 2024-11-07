import { describe, it } from "node:test";
import assert from "node:assert";
import { makeUpsertProductInput, makeGetProductInput } from "./utils.js";

describe("Dynamo utils", () => {
  it("should create upsert product input", () => {
    const product = { id: "123", name: "Test Product" };
    const actual = makeUpsertProductInput(product);
    assert.deepStrictEqual(actual, {
      Item: product,
      TableName: process.env.PRODUCTS_TABLE,
    });
  });

  it("should create get product input", () => {
    const productId = "123";
    const actual = makeGetProductInput(productId);
    assert.deepStrictEqual(actual, {
      Key: { id: productId },
      TableName: process.env.PRODUCTS_TABLE,
    });
  });
});
