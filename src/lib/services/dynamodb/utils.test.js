import { describe, it } from "node:test";
import assert from "node:assert";
import { completeProductSample, cartItemSample } from "#lib/samples/domain.js";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
  makeUpsertCartItemInput,
  makeGetCartItemInput,
} from "./utils.js";

describe("Dynamo utils", () => {
  describe("product", () => {
    it("should create upsert product input", () => {
      const actual = makeUpsertProductInput(completeProductSample);
      assert.deepStrictEqual(actual, {
        Item: {
          PK: "PRODUCT#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "#",
          ...completeProductSample,
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create get product input", () => {
      const productId = "123";
      const actual = makeGetProductInput(productId);
      assert.deepStrictEqual(actual, {
        Key: { PK: "PRODUCT#123", SK: "#" },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
  });
  describe("cart", () => {
    it("should create get cart query", () => {
      const userId = "456";
      const actual = makeGetCartInput(userId);
      assert.deepStrictEqual(actual, {
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": "USER#456",
          ":sk": "PRODUCT#",
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create get cart item input", () => {
      const payload = {
        userUUID: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
        id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
      };
      const actual = makeGetCartItemInput(payload);
      assert.deepStrictEqual(actual, {
        Key: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "PRODUCT#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create add item to cart input", () => {
      const actual = makeUpsertCartItemInput(cartItemSample);
      assert.deepStrictEqual(actual, {
        Item: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "PRODUCT#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          ...cartItemSample,
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
  });
});
