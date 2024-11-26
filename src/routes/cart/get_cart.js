import { middyfy } from "#lib/middleware.js";

const getCartHandler = async (event) => {
  console.log("my  event is ", event);
  try {
    //const cart = await getCart(uuid);
    //return {
    // statusCode: 200,
    //  body: JSON.stringify(cart),
    //  };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(getCartHandler);
