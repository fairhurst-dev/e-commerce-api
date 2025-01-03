import { middyfy } from "#lib/middleware.js";
import { path } from "ramda";
import { searchProducts } from "#lib/services/opensearch/index.js";

const searchProductsHandler = async (event) => {
  const query = path(["queryStringParameters", "q"], event);
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Query not provided" }),
    };
  }

  try {
    const products = await searchProducts(query);

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(searchProductsHandler);
