import { applySpec, assoc, concat, identity, pipe, always, prop } from "ramda";

const addTableName = assoc("TableName", process.env.E_COMMERCE_TABLE);

//keys

const BASE_PREFIX = "#";
const PRODUCT_PREFIX = "PRODUCT#";
const USER_PREFIX = "USER#";

const addProductPrefix = concat(PRODUCT_PREFIX);
const addUserPrefix = concat(USER_PREFIX);

const formatProductKey = applySpec({
  PK: addProductPrefix,
  SK: always(BASE_PREFIX),
});

const formatCartKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("id"), addProductPrefix),
});

//records

const formatProductRecord = (product) => ({
  ...product,
  ...formatProductKey(product.id),
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
  KeyConditionExpression: always("PK = :pk and begins_with(SK, :sk)"),
  ExpressionAttributeValues: {
    ":pk": addUserPrefix,
    ":sk": always(PRODUCT_PREFIX),
  },
});

//exports

export const makeGetCartInput = pipe(formatCartQuery, addTableName);

export const makeUpsertCartItemInput = pipe(
  formatCartItemRecord,
  baseUpsertRecordInput
);

export const makeGetCartItemInput = pipe(formatCartKey, baseGetRecordInput);

export const makeGetProductInput = pipe(formatProductKey, baseGetRecordInput);

export const makeUpsertProductInput = pipe(
  formatProductRecord,
  baseUpsertRecordInput
);
