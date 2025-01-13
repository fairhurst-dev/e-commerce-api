import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import {
  getCart,
  checkout,
  createOrder,
} from "#lib/services/dynamodb/index.js";
import { path } from "ramda";

export const handler = async (event) => {
  try {
    console.log(event);
    const userUUID = getUserUUID(event);

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const cart = await getCart(userUUID);

    console.log("fetched cart", cart);

    if (cart.length === 0) {
      return {
        statusCode: 422,
        body: JSON.stringify({ message: "No items to checkout" }),
      };
    }

    await checkout(cart);

    const order = await createOrder(cart, userUUID);

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

//export const handler = middyfy(checkoutHandler).use(httpJsonBodyParser());
