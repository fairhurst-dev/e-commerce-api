import { middyfy } from "#lib/middleware.js";
import { pipe, tryCatch, andThen } from "ramda";
import { getUserUUID } from "#lib/authorizer.js";
import { getOrders } from "#lib/services/dynamodb/index.js";
import { respFormatter, catcher } from "#routes/utils.js";

export const getOrdersHandler = tryCatch(
  pipe(getUserUUID, getOrders, andThen(respFormatter)),
  catcher
);

export const handler = middyfy(getOrdersHandler);
