import {
  userValidator,
  confirmOTPValidator,
  refreshValidator,
  newProductValidator,
  updateProductValidator,
} from "./validators.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("validators", () => {
  describe("login", () => {
    it("no email is an error", () => {
      assert.throws(
        () => {
          userValidator({ email: "", password: "password" });
        },
        {
          name: "Error",
          message: '"email" is not allowed to be empty',
        }
      );
    });
    it("no password is an error", () => {
      assert.throws(() => {
        userValidator({ email: "foo@bar.com", password: "" }),
          {
            name: "Error",
            message: '"password" is not allowed to be empty',
          };
      });
    });
    it("no otp is an error", () => {
      assert.throws(() => {
        confirmOTPValidator({ email: "foo@bar.com", otp: "" }),
          {
            name: "Error",
            message: '"otp" is not allowed to be empty',
          };
      });
    });
    it("no refresh token is an error", () => {
      assert.throws(() => {
        refreshValidator({ refreshToken: "", deviceKey: "deviceKey" }),
          {
            name: "Error",
            message: '"refreshToken" is not allowed to be empty',
          };
      });
    });
  });
  describe("product", () => {
    it("generates an id", () => {
      const product = newProductValidator({
        name: "product",
        description: "description",
        price: 1,
        msrp: 2,
        stock: 3,
        categories: ["category"],
        sku: "test-sku",
      });
      assert.ok(product.id);
    });
  });
  it("product categories", () => {
    const product = updateProductValidator({
      name: "product",
      description: "description",
      price: 1,
      msrp: 2,
      stock: 3,
      id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
      sku: "test-sku",
    });
    assert.deepStrictEqual(product.categories, []);
  });
  it("must have a name", () => {
    assert.throws(() => {
      refreshValidator({
        description: "description",
        price: 1,
        msrp: 2,
        stock: 3,
        id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
        sku: "test-sku",
      }),
        {
          name: "Error",
          message: '"name" is not allowed to be empty',
        };
    });
  });
});
