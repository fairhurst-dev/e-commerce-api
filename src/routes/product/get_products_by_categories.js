import { middyfy } from "#lib/middleware.js";
import { path } from "ramda";
import { getProductsByCategories } from "#lib/services/opensearch/index.js";

const searchProductsHandler = async (event) => {
  console.log("event", event);
  const qsp = path(["queryStringParameters", "categories"], event);
  console.log("qsp", qsp);
  if (!qsp) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Query String Parameters not provided" }),
    };
  }

  try {
    const products = await getProductsByCategories(qsp);

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
