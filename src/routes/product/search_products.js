import { middyfy } from "#lib/middleware.js";
import { pipe, tryCatch, andThen, ifElse, path, isNotNil } from "ramda";
import { searchProducts } from "#lib/services/opensearch/index.js";
import { respFormatter, catcher, badRequest } from "#routes/utils.js";

const searchProductsHandler = tryCatch(
  pipe(
    path(["queryStringParameters", "q"]),
    ifElse(isNotNil, pipe(searchProducts, andThen(respFormatter)), badRequest)
  ),
  catcher
);

export const handler = middyfy(searchProductsHandler);
