import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import {
  makeUpsertProductInput,
  makeGetProductInput,
  makeGetCartInput,
  makeUpsertCartItemInput,
} from "./utils.js";
import { transformCartForClient } from "#lib/transformers.js";
import { andThen, prop, pipe, tap } from "ramda";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);
const remove = (params) => docClient.delete(params);
const query = (params) => docClient.query(params);

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(tap(console.log), prop("Item")))
);

export const getCart = pipe(
  makeGetCartInput,
  query,
  andThen(pipe(tap(console.log), pipe(prop("Items"), transformCartForClient)))
);

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const upsertCartItem = pipe(
  makeUpsertCartItemInput,
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const deleteCartItem = pipe(
  makeDeleteCartItemInput,
  remove,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const upsertOrder = pipe(); //TODO:
