import { signupValidator } from "./validators.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("validators", () => {
  describe("login", () => {
    it("no email is an error", () => {
      assert.throws(
        () => {
          signupValidator({ email: "", password: "password" });
        },
        {
          name: "Error",
          message: '"email" is not allowed to be empty',
        }
      );
    });
    it("no password is an error", () => {
      assert.throws(() => {
        signupValidator({ email: "foo@bar.com", password: "" }),
          {
            name: "Error",
            message: '"password" is not allowed to be empty',
          };
      });
    });
    it("no otp is an error", () => {
      assert.throws(() => {
        signupValidator({ email: "foo@bar.com", otp: "" }),
          {
            name: "Error",
            message: '"otp" is not allowed to be empty',
          };
      });
    });
  });
});
