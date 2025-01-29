import { middyfy } from "#lib/middleware.js";
import { pipe, tryCatch, andThen } from "ramda";
import { getProducts } from "#lib/services/dynamodb/index.js";
import { respFormatter, catcher } from "#routes/utils.js";

const getProductsHandler = tryCatch(
  pipe(getProducts, andThen(respFormatter)),
  catcher
);

export const handler = middyfy(getProductsHandler);
