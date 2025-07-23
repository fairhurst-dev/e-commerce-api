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
  asyncTap,
  notFound,
} from "#routes/utils.js";

export const addCartItemHandler = async (event) => {
  const productExists = await checkIfProductExists(event);

  if (!productExists) {
    return notFound();
  }

  const quantity = path(["body", "quantity"], event);

  if (!quantity || quantity < 1) {
    return badRequest("Quantity must be a positive integer.");
  }

  const product = await getProduct(event.pathParameters.id);

  if (quantity > product.stock) {
    return badRequest("Quantity exceeds available stock.");
  }

  return tryCatch(
    pipe(
      converge(assoc("quantity"), [always(quantity), identity]),
      converge(assoc("userUUID"), [() => getUserUUID(event), identity]),
      cartItemValidator,
      asyncTap(upsertCartItem),
      andThen(respFormatter)
    ),
    catcher
  )(product);
};

export const handler = middyfy(addCartItemHandler).use(httpJsonBodyParser());
