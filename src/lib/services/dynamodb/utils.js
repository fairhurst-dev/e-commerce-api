import {
  applySpec,
  assoc,
  concat,
  identity,
  pipe,
  always,
  prop,
  propOr,
} from "ramda";

const addTableName = assoc("TableName", process.env.PRODUCTS_TABLE);

//keys

const addProductPrefix = concat("PRODUCT#");
const addUserPrefix = concat("USER#");
const addBasePrefix = always("#");

const formatProductKey = applySpec({
  PK: pipe(propOr(identity, "id"), addProductPrefix),
  SK: addBasePrefix,
});

const formatCartKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("id"), addProductPrefix),
});

//records

const formatProductRecord = (product) => ({
  ...product,
  ...formatProductKey(product),
});

const formatCartItemRecord = (cartItem) => ({
  ...cartItem,
  ...formatCartKey(cartItem),
});

const baseUpsertRecordInput = pipe(
  applySpec({
    Item: identity,
  }),
  addTableName
);

const baseGetRecordInput = pipe(
  applySpec({
    Key: {
      PK: prop("PK"),
      SK: prop("SK"),
    },
  }),
  addTableName
);

//queries
const formatCartQuery = applySpec({
  KeyConditionExpression: always("PK = :pk and SK BEGINS_WITH :sk"),
  ExpressionAttributeValues: {
    ":pk": addUserPrefix,
    ":sk": addProductPrefix,
  },
});

//exports

export const makeUpsertCartItemInput = pipe(
  formatCartItemRecord,
  baseUpsertRecordInput
);

export const makeDeleteCartItemInput = {};

export const makeUpsertProductInput = pipe(
  formatProductRecord,
  baseUpsertRecordInput
);

export const makeGetProductInput = pipe(formatProductKey, baseGetRecordInput);

export const makeGetCartInput = pipe(formatCartQuery, addTableName);
