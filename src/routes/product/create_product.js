import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { pipe, tryCatch, prop, tap, ifElse } from "ramda";
import { upsertProduct } from "#lib/services/dynamodb/index.js";
import { newProductValidator } from "#lib/validators.js";
import { respFormatter, catcher, unauthorized } from "#routes/utils.js";
import { getIsAdmin } from "#lib/authorizer.js";

export const createProductHandler = tryCatch(
  ifElse(
    getIsAdmin,
    pipe(prop("body"), newProductValidator, tap(upsertProduct), respFormatter),
    unauthorized
  ),
  catcher
);

export const handler = middyfy(createProductHandler).use(httpJsonBodyParser());
