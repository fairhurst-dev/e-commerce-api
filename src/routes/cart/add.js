import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { getUserUUID } from "#lib/authorizer.js";
import { getProduct, upsertCartItem } from "#lib/services/dynamodb/index.js";
import {
  path,
  tryCatch,
  andThen,
  assoc,
  pipe,
  converge,
  identity,
  always,
} from "ramda";
import { cartItemValidator } from "#lib/validators.js";
import {
  catcher,
  checkIfProductExists,
  respFormatter,
  badRequest,
} from "#routes/utils.js";

export const addCartItemHandler = async (event) => {
  const productExists = await checkIfProductExists(event);

  if (!productExists) {
    return badRequest();
  }

  const quantity = path(["body", "quantity"], event);

  return tryCatch(
    pipe(
      path(["pathParameters", "id"]),
      getProduct,
      andThen(
        pipe(
          converge(assoc("quantity"), [always(quantity), identity]),
          converge(assoc("userUUID"), [() => getUserUUID(event), identity]),
          cartItemValidator,
          upsertCartItem,
          andThen(respFormatter)
        )
      )
    ),
    catcher
  )(event);
};

export const handler = middyfy(addCartItemHandler).use(httpJsonBodyParser());
