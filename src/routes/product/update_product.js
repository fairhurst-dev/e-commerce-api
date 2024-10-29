import { middyfy } from "#lib/services/middleware.js";
import { prop } from "ramda";
import { getIsAdmin } from "#lib/utils/authorizer.js";

const createProductsHandler = async (event) => {
  console.log("my auth event is ", event);
  const product = prop("body", event);
  try {
    const isAdmin = getIsAdmin(event);

    if (!isAdmin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    // const payload = productValidator(product);

    //await updateProduct(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product updated" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(createProductsHandler);
