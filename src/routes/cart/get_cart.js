import { middyfy } from "#lib/middleware.js";
import { getCart } from "#lib/services/dynamodb/index.js";
import { getUserUUID } from "#lib/authorizer.js";

export const handler = async (event) => {
  console.log("my event is ", event);
  try {
    const uuid = getUserUUID(event);

    if (!uuid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const cart = await getCart(uuid);

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

//export const handler = middyfy(getCartHandler);
