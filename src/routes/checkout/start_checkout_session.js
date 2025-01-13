import { middyfy } from "#lib/middleware.js";
import { getUserUUID } from "#lib/authorizer.js";
import { getCart, startCheckoutSession } from "#lib/services/dynamodb/index.js";

export const checkoutHandler = async (event) => {
  try {
    const userUUID = getUserUUID(event);

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

    const checkoutURL = await startCheckoutSession(cart);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: checkoutURL }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(checkoutHandler);
