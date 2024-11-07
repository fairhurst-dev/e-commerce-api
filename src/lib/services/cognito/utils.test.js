import {
  authRespForClient,
  makeSignupInput,
  makeLoginInput,
  makeRefreshInput,
  makeConfirmSignupInput,
} from "./utils.js";
import { LOGIN_COGNITO_RESP } from "#lib/samples/cognito.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("transformers", () => {
  it("transforms login resp for client", () => {
    const actual = authRespForClient(LOGIN_COGNITO_RESP);
    assert.deepStrictEqual(actual, {
      AccessToken: "eyJra456defEXAMPLE",
      ExpiresIn: 3600,
      IdToken: "eyJra789ghiEXAMPLE",
      TokenType: "Bearer",
    });
  });

  it("makes signup input", () => {
    const input = { email: "test@example.com", password: "password123" };
    const actual = makeSignupInput(input);
    assert.deepStrictEqual(actual, {
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: "test@example.com",
      Password: "password123",
      UserAttributes: [{ Name: "email", Value: "test@example.com" }],
    });
  });

  it("makes login input", () => {
    const input = { email: "test@example.com", password: "password123" };
    const actual = makeLoginInput(input);
    assert.deepStrictEqual(actual, {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.USER_POOL_CLIENT_ID,
      UserPoolId: process.env.USER_POOL_ID,
      AuthParameters: {
        USERNAME: "test@example.com",
        PASSWORD: "password123",
      },
    });
  });

  it("makes refresh input", () => {
    const input = { refreshToken: "some-refresh-token" };
    const actual = makeRefreshInput(input);
    assert.deepStrictEqual(actual, {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: process.env.USER_POOL_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: "some-refresh-token",
      },
    });
  });

  it("makes confirm signup input", () => {
    const input = { email: "test@example.com", otp: "123456" };
    const actual = makeConfirmSignupInput(input);
    assert.deepStrictEqual(actual, {
      ClientId: process.env.USER_POOL_CLIENT_ID,
      Username: "test@example.com",
      ConfirmationCode: "123456",
    });
  });
});