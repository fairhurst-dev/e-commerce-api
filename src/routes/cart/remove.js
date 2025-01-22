import { middyfy } from "#lib/middleware.js";
import { getUserUUID } from "#lib/authorizer.js";
import { path, pipe, applySpec, andThen, tryCatch, tap } from "ramda";
import { deleteCartItem } from "#lib/services/dynamodb/index.js";
import { catcher, noContent } from "#routes/utils.js";

export const removeCartItemHandler = tryCatch(
  pipe(
    applySpec({
      userUUID: getUserUUID,
      id: path(["pathParameters", "id"]),
    }),
    deleteCartItem,
    andThen(noContent)
  ),
  catcher
);

export const handler = middyfy(removeCartItemHandler);
