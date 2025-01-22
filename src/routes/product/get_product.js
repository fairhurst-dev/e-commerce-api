import { middyfy } from "#lib/middleware.js";
import { pipe, tryCatch, andThen, ifElse, path, isNotNil } from "ramda";
import { getProduct } from "#lib/services/dynamodb/index.js";
import { respFormatter, catcher, notFound, badRequest } from "#routes/utils.js";

const getProductHandler = tryCatch(
  pipe(
    path(["pathParameters", "id"]),
    ifElse(
      isNotNil,
      pipe(getProduct, andThen(ifElse(isNotNil, respFormatter, notFound))),
      badRequest
    )
  ),
  catcher
);

export const handler = middyfy(getProductHandler);
