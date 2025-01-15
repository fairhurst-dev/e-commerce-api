import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { getCart, checkout } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";

export const handler = async (event) => {
  try {
    const userUUID = getUserUUID(event);
    const paymentMethodId = event.body.paymentMethodId;

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const cart = await getCart(userUUID);

    if (cart.items.length === 0) {
      return {
        statusCode: 422,
        body: JSON.stringify({ message: "No items to checkout" }),
      };
    }

    const order = await checkout({ ...cart, paymentMethodId });

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
