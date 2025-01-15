import { describe, it } from "node:test";
import assert from "node:assert";
import { decorateFormattedPrice } from "./decorators.js";
import { newProductSample } from "#lib/samples/domain.js";

describe("Decorators", () => {
  it("decorates formatted price", () => {
    const actual = decorateFormattedPrice(newProductSample);
    console.log("actual", actual);
  });
});
