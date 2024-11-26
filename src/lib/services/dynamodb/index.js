import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
  makeUpsertCartItemInput,
  makeGetCartItemInput,
} from "./utils.js";
import { transformCartForClient } from "#lib/transformers.js";
import { andThen, prop, pipe, tap, omit, map } from "ramda";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);
const remove = (params) => docClient.delete(params);
const query = (params) => docClient.query(params);

const scrubKeys = omit(["PK", "SK"]);

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(tap(console.log), prop("Item"), scrubKeys))
);

export const getCartItem = pipe(
  makeGetCartItemInput,
  get,
  andThen(pipe(tap(console.log), prop("Item"), scrubKeys))
);

export const getCart = pipe(
  makeGetCartInput,
  query,
  andThen(
    pipe(
      tap(console.log),
      pipe(prop("Items"), map(scrubKeys), transformCartForClient)
    )
  )
);

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const upsertCartItem = pipe(
  makeUpsertCartItemInput,
  tap(console.log),
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const deleteCartItem = pipe(
  makeGetCartItemInput,
  remove,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

//export const upsertOrder = pipe(); //TODO:
