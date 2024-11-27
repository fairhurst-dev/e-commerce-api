import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const updateCartHandler = async (event) => {
  //TODO: rewrite these functionally?

  try {
    //const cart = await upsertCart(payload);
    //return {
    //  statusCode: 200,
    //   body: JSON.stringify(cart),
    // };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(updateCartHandler).use(httpJsonBodyParser());
