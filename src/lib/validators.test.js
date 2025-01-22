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
        () => userValidator({ email: "", password: "abcdefghij6&" }),
        {
          name: "Error",
          message: '"email" is not allowed to be empty',
        }
      );
    });
    it("no password is an error", () => {
      assert.throws(
        () => userValidator({ email: "foo@bar.com", password: "" }),
        {
          name: "Error",
          message: '"password" is not allowed to be empty',
        }
      );
    });
    it("password must be 8 characters", () => {
      assert.throws(
        () => userValidator({ email: "foo@bar.com", password: "123!" }),
        {
          name: "Error",
          message: '"password" length must be at least 8 characters long',
        }
      );
    });
    it("password must be less than 16 characters", () => {
      assert.throws(
        () =>
          userValidator({
            email: "foo@bar.com",
            password: "123456789101112113@",
          }),
        {
          name: "Error",
          message:
            '"password" length must be less than or equal to 16 characters long',
        }
      );
    });
    it("password must contain a special character", () => {
      assert.throws(
        () =>
          userValidator({
            email: "foo@bar.com",
            password: "123456789",
          }),
        {
          name: "Error",
          message: '"password" must contain at least one special character',
        }
      );
    });
    it("no otp is an error", () => {
      assert.throws(() =>
        confirmOTPValidator({ email: "foo@bar.com", otp: "" })
      );
    });
    it("no refresh token is an error", () => {
      assert.throws(
        () => refreshValidator({ refreshToken: "", deviceKey: "deviceKey" }),
        {
          name: "Error",
          message: '"refreshToken" is not allowed to be empty',
        }
      );
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
      assert.throws(
        () =>
          newProductValidator({
            description: "description",
            price: 1,
            msrp: 2,
            stock: 3,
            id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
            sku: "test-sku",
          }),
        {
          name: "Error",
          message: '"name" is required',
        }
      );
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
