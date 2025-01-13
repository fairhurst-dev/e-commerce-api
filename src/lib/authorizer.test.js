import { SAMPLE_HTTP_EVENT } from "#lib/samples/http_event.js";
import { getIsAdmin, getUserUUID } from "./authorizer.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("authorizer", () => {
  it("should know an admin", () => {
    const actual = getIsAdmin(SAMPLE_HTTP_EVENT);
    assert.strictEqual(actual, true);
  });
  it("should get a username", () => {
    const actual = getUserUUID(SAMPLE_HTTP_EVENT);
    assert.strictEqual(actual, "1234567");
  });
});
