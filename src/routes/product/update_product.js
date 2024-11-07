import { middyfy } from "#lib/middleware.js";
import { prop, path } from "ramda";
import { getIsAdmin } from "#lib/authorizer.js";
import { upsertProduct, getProduct } from "#lib/services/dynamodb/index.js";
import { updateProductValidator } from "#lib/validators.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const createProductsHandler = async (event) => {
  const eventBody = prop("body", event);
  const productId = path(["pathParameters", "id"], event);
  try {
    const isAdmin = getIsAdmin(event);

    if (!isAdmin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const existingProduct = await getProduct(productId);

    if (!existingProduct) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }

    const payload = updateProductValidator(eventBody);

    const product = await upsertProduct(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ body: product, message: "Product updated" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(createProductsHandler).use(httpJsonBodyParser());
