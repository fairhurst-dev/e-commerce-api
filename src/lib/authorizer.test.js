import { SAMPLE_HTTP_EVENT } from "#lib/samples/http_event.js";
import { getIsAdmin } from "./authorizer.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("authorizer", () => {
  it("knows an admin", () => {
    const actual = getIsAdmin(SAMPLE_HTTP_EVENT);
    assert.strictEqual(actual, true);
  });
});
