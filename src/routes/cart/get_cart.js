import { middyfy } from "#lib/middleware.js";
import { getCart } from "#lib/services/dynamodb/index.js";
import { getUserUUID } from "#lib/authorizer.js";
import { tryCatch, pipe, andThen } from "ramda";
import { respFormatter, catcher } from "#routes/utils.js";

export const getCartHandler = tryCatch(
  pipe(getUserUUID, getCart, andThen(respFormatter)),
  catcher
);

export const handler = middyfy(getCartHandler);
