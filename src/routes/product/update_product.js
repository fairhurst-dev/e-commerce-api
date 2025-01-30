import { middyfy } from "#lib/middleware.js";
import { prop, tryCatch, pipe, ifElse, tap } from "ramda";
import { upsertProduct } from "#lib/services/dynamodb/index.js";
import { updateProductValidator } from "#lib/validators.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import {
  respFormatter,
  catcher,
  checkIfProductExists,
  badRequest,
  unauthorized,
} from "#routes/utils.js";
import { getIsAdmin } from "#lib/authorizer.js";

export const updateProductsHandler = async (event) => {
  const productExists = await checkIfProductExists(event);

  if (!productExists) {
    return badRequest();
  }
  return tryCatch(
    ifElse(
      getIsAdmin,
      pipe(
        prop("body"),
        updateProductValidator,
        tap(upsertProduct),
        respFormatter
      ),
      unauthorized
    ),
    catcher
  )(event);
};

export const handler = middyfy(updateProductsHandler).use(httpJsonBodyParser());
