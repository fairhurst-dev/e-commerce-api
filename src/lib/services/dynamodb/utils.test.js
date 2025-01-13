import { describe, it } from "node:test";
import assert from "node:assert";
import {
  completeProductSample,
  cartItemSample,
  cartSample,
  orderSample,
} from "#lib/samples/domain.js";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
  makeUpsertCartItemInput,
  makeGetCartItemInput,
  itemIsInCart,
  makeUpsertCartInput,
  makeUpsertOrderInput,
  makeDeleteCartInput,
  makeDeleteCartItemInput,
  makeGetOrderInput,
  makeGetOrdersInput,
} from "./utils.js";

describe("Dynamo utils", () => {
  describe("queries", () => {
    it("should create get cart query", () => {
      const userId = "456";
      const actual = makeGetCartInput(userId);
      assert.deepStrictEqual(actual, {
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": "USER#456",
          ":sk": "CART#",
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
          SK: "CART#ITEM#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
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
    it("should create get order input", () => {
      const actual = makeGetOrderInput({ userUUID: "123", cartUUID: "456" });
      assert.deepStrictEqual(actual, {
        Key: { PK: "USER#123", SK: "ORDER#456" },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create get orders input", () => {
      const userId = "456";
      const actual = makeGetOrdersInput(userId);
      assert.deepStrictEqual(actual, {
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": "USER#456",
          ":sk": "ORDER#",
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
  });
  describe("deletes", () => {
    it("should create delete cart item input", () => {
      const actual = makeDeleteCartItemInput(cartItemSample);
      console.log(actual);
      assert.deepStrictEqual(actual, {
        Key: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "CART#ITEM#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
        },
        TableName: process.env.E_COMMERCE_TABLE,
        ConditionExpression: "attribute_exists(PK)",
      });
    });
    it("should create delete cart  input", () => {
      const actual = makeDeleteCartInput(cartSample);
      assert.deepStrictEqual(actual, {
        Key: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "CART#3dd210bf-59df-438f-b50c-2b1dcd08d8b5",
        },
        TableName: process.env.E_COMMERCE_TABLE,
        ConditionExpression: "attribute_exists(PK)",
      });
    });
  });
  describe("records", () => {
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
    it("should create upsert cart item input", () => {
      const actual = makeUpsertCartItemInput(cartItemSample);
      assert.deepStrictEqual(actual, {
        Item: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "CART#ITEM#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          ...cartItemSample,
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create upsert cart input", () => {
      const actual = makeUpsertCartInput(cartSample);
      assert.deepStrictEqual(actual, {
        Item: {
          PK: "USER#1b4e28ba-2fa1-11d2-883f-0016d3cca427",
          SK: "CART#3dd210bf-59df-438f-b50c-2b1dcd08d8b5",
          ...cartSample,
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
    it("should create upsert order input", () => {
      const actual = makeUpsertOrderInput(orderSample);
      assert.deepStrictEqual(actual, {
        Item: {
          PK: "USER#64c8f4c8-2041-70ce-779a-b5c9cc42e55f",
          SK: "ORDER#36669190-9a99-4092-a894-320839a56b0e",
          ...orderSample,
        },
        TableName: process.env.E_COMMERCE_TABLE,
      });
    });
  });
  describe("helpers", () => {
    it("knows if item is in cart", () => {
      const actual = itemIsInCart({ items: [cartItemSample] }, cartItemSample);
      assert.strictEqual(actual, true);
    });
  });
});
