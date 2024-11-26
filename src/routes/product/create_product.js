import { middyfy } from "#lib/middleware.js";
import { prop } from "ramda";
import { getIsAdmin } from "#lib/authorizer.js";
import { upsertProduct } from "#lib/services/dynamodb/index.js";
import { newProductValidator } from "#lib/validators.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export const handler = async (event) => {
  console.log("HERE?");
  //TODO: rewrite these functionally?

  const body = prop("body", event);
  try {
    console.log("event", event);
    const isAdmin = getIsAdmin(event);

    if (!isAdmin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthor" }),
      };
    }

    const payload = newProductValidator(JSON.parse(body));

    const product = await upsertProduct(payload);
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

//export const handler = middyfy(createProductHandler).use(httpJsonBodyParser());
