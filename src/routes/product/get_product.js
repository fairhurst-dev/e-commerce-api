import { middyfy } from "#lib/services/middleware.js";
import { prop } from "ramda";

const getProductHandler = async (event) => {
  console.log("my  event is ", event);
  //const productId = prop("body", id);
  try {
    // const product = await getProduct(productId);

    /*  if (!product) {
      console.error("Product not found for ID", productId);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }*/

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product found" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(getProductHandler);
