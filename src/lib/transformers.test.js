import { describe, it } from "node:test";
import assert from "node:assert";
import { transformCartForClient } from "./transformers.js";
import { cartItemSample } from "#lib/samples/domain.js";

describe("Transformers", () => {
  it("should transform cart for client", () => {
    const actual = transformCartForClient([cartItemSample]);
    console.log("actual", actual);
  });
});
