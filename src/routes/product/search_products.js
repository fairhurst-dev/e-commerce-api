import { middyfy } from "#lib/services/middleware.js";
import { prop } from "ramda";

const searchProductsHandler = async (event) => {
  console.log("my  event is ", event);
  //const query = path(["queryStringParameters", "q"], event);
  try {
    // const products = await searchProducts(query);

    /*  if (!products.length) {
      console.error("Products not found for query", query);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No Products found" }),
      };
    }*/

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Products found" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(searchProductsHandler);
