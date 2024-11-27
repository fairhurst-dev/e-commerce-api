import { middyfy } from "#lib/middleware.js";
import { path } from "ramda";
import { getCart } from "#lib/services/dynamodb/index.js";

const getCartHandler = async (event) => {
  console.log("my  event is ", event);
  try {
    const uuid = path(
      ["requestContext", "authorizer", "jwt", "claims", "username"],
      event
    );

    if (!uuid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const cart = await getCart(uuid);

    if (!cart) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Cart not found" }),
      };
    }

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

export const handler = middyfy(getCartHandler);
