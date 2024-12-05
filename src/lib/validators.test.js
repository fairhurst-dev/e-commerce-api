import {
  userValidator,
  confirmOTPValidator,
  refreshValidator,
  newProductValidator,
  updateProductValidator,
  cartItemValidator,
} from "./validators.js";
import { describe, it } from "node:test";
import assert from "node:assert";
import {
  newProductSample,
  completeProductSample,
  cartItemSample,
} from "#lib/samples/domain.js";

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
      const product = newProductValidator(newProductSample);
      assert.ok(product.id);
    });
    it("product categories", () => {
      const product = updateProductValidator(completeProductSample);
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
  describe("cart", () => {
    it("valid cart item", () => {
      const cartItem = cartItemValidator(cartItemSample);
      assert.ok(cartItem);
    });
    it("must have user id", () => {
      delete cartItemSample.userUUID;
      assert.throws(() => {
        cartItemValidator(cartItemSample);
      });
    });
    it("must have quantity", () => {
      delete cartItemSample.quantity;
      assert.throws(() => {
        cartItemValidator(cartItemSample);
      });
    });
  });
});
