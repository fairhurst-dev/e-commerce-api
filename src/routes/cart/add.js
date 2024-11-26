import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { getProduct } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";
import { upsertCartItem } from "#lib/services/dynamodb/index.js";
import { cartItemValidator } from "#lib/validators.js";

export const handler = async (event) => {
  try {
    console.log(event);
    const userUUID = getUserUUID(event);
    const productId = path(["pathParameters", "productId"], event);
    const e = { body: JSON.parse(event.body) };

    const quantity = path(["body", "quantity"], e);

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const product = await getProduct(productId);

    console.log("fetched priduct", product);

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

    const updatedCart = await upsertCartItem(payload);

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

//export const handler = middyfy(addCartItemHandler).use(httpJsonBodyParser());
