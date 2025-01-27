import { middyfy } from "#lib/middleware.js";
import { getUserUUID } from "#lib/authorizer.js";
import { getOrder } from "#lib/services/dynamodb/index.js";
import {
  isNotNil,
  ifElse,
  path,
  tryCatch,
  andThen,
  applySpec,
  pipe,
} from "ramda";
import { respFormatter, catcher, notFound } from "#routes/utils.js";

export const getOrderHandler = tryCatch(
  pipe(
    applySpec({
      userUUID: getUserUUID,
      cartUUID: path(["pathParameters", "cartUUID"]),
    }),
    getOrder,
    andThen(ifElse(isNotNil, respFormatter, notFound))
  ),
  catcher
);

export const handler = middyfy(getOrderHandler);
