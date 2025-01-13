import { middyfy } from "#lib/middleware.js";
import { getUserUUID } from "#lib/authorizer.js";
import { getOrder } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";

export const getOrderHandler = async (event) => {
  try {
    const userUUID = getUserUUID(event);
    const cartUUID = path(["pathParameters", "cartUUID"], event);

    if (!userUUID) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const order = await getOrder({
      userUUID,
      cartUUID,
    });

    if (!order) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "order not found" }),
      };
    }

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

export const handler = middyfy(getOrderHandler);
