import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { makeUpsertProductInput, makeGetProductInput } from "./utils.js";
import { andThen, prop, pipe, tap } from "ramda";

const client = new DynamoDB({});
const docClient = DynamoDBDocument.from(client);

const get = (params) => docClient.get(params);
const put = (params) => docClient.put(params);

export const upsertProduct = pipe(
  makeUpsertProductInput,
  put,
  andThen(pipe(tap(console.log), prop("Attributes")))
);

export const getProduct = pipe(
  makeGetProductInput,
  get,
  andThen(pipe(tap(console.log), prop("Item")))
);
