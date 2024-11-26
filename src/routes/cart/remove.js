import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { path } from "ramda";
import { getCartItem, deleteCartItem } from "#lib/services/dynamodb/index.js";

const removeCartItemHandler = async (event) => {
  try {
    const userUUID = getUserUUID(event);
    const productId = path(["pathParameters", "productId"], event);

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const payload = {
      userUUID,
      id: productId,
    };

    const cartItem = await getCartItem(payload);

    if (!cartItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Cart Item not found" }),
      };
    }

    await deleteCartItem(payload);

    return {
      statusCode: 200,
      body: JSON.stringify(true),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(removeCartItemHandler);
