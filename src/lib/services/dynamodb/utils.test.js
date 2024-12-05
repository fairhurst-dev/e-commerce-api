import { describe, it } from "node:test";
import assert from "node:assert";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
} from "./utils.js";

describe("Dynamo utils", () => {
  describe("product", () => {
    it("should create upsert product input", () => {
      const product = { id: "123", name: "Test Product" };
      const actual = makeUpsertProductInput(product);
      assert.deepStrictEqual(actual, {
        Item: { PK: "PRODUCT#123", SK: "#", ...product },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });

    it("should create get product input", () => {
      const productId = "123";
      const actual = makeGetProductInput(productId);
      assert.deepStrictEqual(actual, {
        Key: { PK: "PRODUCT#123", SK: "#" },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });
  });
  describe("cart", () => {
    it("should create get cart input", () => {
      const userId = "456";
      const actual = makeGetCartInput(userId);
      assert.deepStrictEqual(actual, {
        KeyConditionExpression: "PK = :pk and SK BEGINS_WITH :sk",
        ExpressionAttributeValues: {
          ":pk": "USER#456",
          ":sk": "PRODUCT#",
        },
        TableName: process.env.PRODUCTS_TABLE,
      });
    });
  });
});
