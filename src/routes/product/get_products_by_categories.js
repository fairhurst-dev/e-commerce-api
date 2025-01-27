import { middyfy } from "#lib/middleware.js";
import { pipe, tryCatch, andThen, ifElse, path, isNotNil } from "ramda";
import { getProductsByCategories } from "#lib/services/opensearch/index.js";
import { respFormatter, catcher, badRequest } from "#routes/utils.js";

const searchProductsHandler = tryCatch(
  pipe(
    path(["queryStringParameters", "categories"]),
    ifElse(
      isNotNil,
      pipe(getProductsByCategories, andThen(respFormatter)),
      badRequest
    )
  ),
  catcher
);

export const handler = middyfy(searchProductsHandler);
