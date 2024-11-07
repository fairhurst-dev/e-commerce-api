import {
  formatCreateIndexPayload,
  formatIndexRecordPayload,
  formatUpdateMappingPayload,
  formatQuery,
  formatCategoryQuery,
  formatQueryRespForClient,
} from "./utils.js";
import { describe, it } from "node:test";
import assert from "node:assert";
import { PRODUCTS_MAPPINGS } from "./config.js";
import { sampleQueryResponse } from "#lib/samples/open_search.js";

describe("open search utils", () => {
  it("create an index payload", () => {
    const payload = formatCreateIndexPayload();
    assert.deepEqual(payload, {
      index: "products",
      body: { mappings: PRODUCTS_MAPPINGS },
    });
  });
  it("index a record payload", () => {
    const payload = formatIndexRecordPayload({ id: "1", name: "product" });
    assert.deepStrictEqual(payload, {
      index: "products",
      id: "1",
      body: { id: "1", name: "product" },
    });
  });
  it("updates index mappings", () => {
    const payload = formatUpdateMappingPayload();
    assert.deepStrictEqual(payload, {
      index: "products",
      body: PRODUCTS_MAPPINGS,
    });
  });
  it("formats query", () => {
    const actual = formatQuery("headphones");
    assert.deepStrictEqual(actual, {
      index: "products",
      body: {
        query: {
          query_string: {
            query: "headphones",
          },
        },
      },
    });
  });
  it("formats filter by category query", () => {
    const actual = formatCategoryQuery("men,women");
    assert.deepStrictEqual(actual, {
      index: "products",
      body: {
        query: {
          terms: {
            categories: ["men", "women"],
          },
        },
      },
    });
  });
  it("formats query response for client", () => {
    const actual = formatQueryRespForClient(sampleQueryResponse);
    assert.deepStrictEqual(actual, [
      {
        id: "1f8b56bc-9370-4a0c-b8ed-d4f9a28d97c4",
        relevanceScore: 1,
        body: {
          price: 99.99,
          msrp: 159.99,
          name: "Wireless Bluetooth Headphones",
          description:
            "High-quality wireless headphones with noise cancellation.",
          categories: ["Electronics", "Audio"],
          id: "1f8b56bc-9370-4a0c-b8ed-d4f9a28d97c4",
          sku: "WH-12345",
          stock: 25,
        },
      },
      {
        id: "2e4a41d3-b99c-4b92-b817-3c5b9087c848",
        relevanceScore: 1,
        body: {
          price: 19.95,
          msrp: 24.95,
          name: "Stainless Steel Water Bottle",
          description:
            "Eco-friendly, reusable water bottle with a 1-liter capacity.",
          categories: ["Home & Kitchen", "Sports"],
          id: "2e4a41d3-b99c-4b92-b817-3c5b9087c848",
          sku: "SWB-67890",
          stock: 100,
        },
      },
    ]);
  });
});
