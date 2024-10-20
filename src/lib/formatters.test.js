import { authRespForClient } from "./formatters.js";
import { loginCognitoResp } from "./samples.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("formatters", () => {
  it("formats login resp for client", () => {
    const actual = authRespForClient(loginCognitoResp);
    assert.deepStrictEqual(actual, {
      AccessToken: "eyJra456defEXAMPLE",
      ExpiresIn: 3600,
      IdToken: "eyJra789ghiEXAMPLE",
      TokenType: "Bearer",
    });
  });
});
