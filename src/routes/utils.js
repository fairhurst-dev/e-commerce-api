import {
  applySpec,
  always,
  tap,
  pipe,
  isNotNil,
  ifElse,
  when,
  andThen,
  isNil,
  path,
  prop,
} from "ramda";
import { getProduct, getCartItem } from "#lib/services/dynamodb/index.js";

const stringify = (input) => JSON.stringify(input);

export const respFormatter = applySpec({
  statusCode: always(200),
  body: stringify,
});

export const catcher = pipe(
  tap(console.error),
  applySpec({
    statusCode: always(500),
    body: ifElse(isNotNil, prop("message"), always("Internal Server Error")),
  })
);

export const unauthorized = applySpec({
  statusCode: always(401),
  body: always("Unauthorized"),
});

export const notFound = applySpec({
  statusCode: always(404),
  body: always("Not Found"),
});

export const badRequest = applySpec({
  statusCode: always(400),
  body: always("Bad Request"),
});

export const noContent = applySpec({
  statusCode: always(204),
});

const logger = (input) => {
  console.log("result of get product", input);
};

export const checkIfProductExists = pipe(
  path(["pathParameters", "id"]),
  getProduct,
  andThen(pipe(tap(logger), ifElse(isNotNil, always(true), always(false))))
);

export const checkIfCartItemExists = pipe(
  getCartItem,
  andThen(when(isNil, notFound))
);

export const asyncTap = (asyncFn) => async (input) => {
  await asyncFn(input);
  return Promise.resolve(input);
};
