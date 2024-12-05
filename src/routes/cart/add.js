import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { getProduct } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";
import { getCart, upsertCartItem } from "#lib/services/dynamodb/index.js";

const updateCartHandler = async (event) => {
  try {
    const uuid = getUserUUID(event);
    const productId = path(["pathParameters", "productId"], event);

    if (!uuid) {
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

    const updatedCart = await upsertCartItem({ ...product, userUUID: uuid });

    return {
      statusCode: 200,
      body: JSON.stringify(updatedCart),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(updateCartHandler).use(httpJsonBodyParser());
