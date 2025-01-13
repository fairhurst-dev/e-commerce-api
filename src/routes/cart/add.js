import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { getProduct, upsertCartItem } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";
import { cartItemValidator } from "#lib/validators.js";

export const addCartItemHandler = async (event) => {
  try {
    const userUUID = getUserUUID(event);
    const productId = path(["pathParameters", "productId"], event);
    const quantity = path(["body", "quantity"], event);

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const product = await getProduct(productId);

    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }

    const payload = cartItemValidator({
      ...product,
      quantity,
      userUUID,
    });

    const cart = await upsertCartItem(payload);

    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(addCartItemHandler).use(httpJsonBodyParser());
