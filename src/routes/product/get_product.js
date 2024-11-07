import { middyfy } from "#lib/middleware.js";
import { getProduct } from "#lib/services/dynamodb/index.js";
import { path } from "ramda";

const getProductHandler = async (event) => {
  console.log("my  event is ", event);
  const productId = path(["pathParameters", "id"], event);
  try {
    const product = await getProduct(productId);

    if (!product) {
      console.error("Product not found for ID", productId);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(getProductHandler);
