import { middyfy } from "#lib/services/middleware.js";
import { prop } from "ramda";
import { getIsAdmin } from "#lib/utils/authorizer.js";

const createProductHandler = async (event) => {
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

    //await createProduct(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Product created" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(createProductHandler);
