import {
  applySpec,
  assoc,
  concat,
  identity,
  pipe,
  always,
  prop,
  path,
  when,
  has,
  tap,
} from "ramda";

const addTableName = assoc("TableName", process.env.E_COMMERCE_TABLE);

//keys

const BASE_PREFIX = "#";
const PRODUCT_PREFIX = "PRODUCT#";
const USER_PREFIX = "USER#";
const CART_PREFIX = "CART#";
const CART_ITEM_PREFIX = "CART#ITEM#";
const ORDER_PREFIX = "ORDER#";
const STATUS_PREFIX = "STATUS#";

const addProductPrefix = concat(PRODUCT_PREFIX);
const addUserPrefix = concat(USER_PREFIX);
const addCartPrefix = concat(CART_PREFIX);
const addCartItemPrefix = concat(CART_ITEM_PREFIX);
const addOrderPrefix = concat(ORDER_PREFIX);
const addStatusPrefix = concat(STATUS_PREFIX);

const formatProductKey = applySpec({
  PK: addProductPrefix,
  SK: always(BASE_PREFIX),
});

const formatCartItemKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("id"), addCartItemPrefix),
});

const formatCartKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("cartUUID"), addCartPrefix),
});

const formatGerOrderKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("orderUUID"), addOrderPrefix),
});

const formatFullOrderKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("cartUUID"), addOrderPrefix),
  GSI1PK: pipe(path(["paymentIntent", "status"]), addStatusPrefix),
});

//records

const formatProductRecord = (product) => ({
  ...product,
  ...formatProductKey(product.id),
});

const formatCartItemRecord = (cartItem) => ({
  ...cartItem,
  ...formatCartItemKey(cartItem),
});

const formatCartRecord = (cart) => ({
  ...cart,
  ...formatCartKey(cart),
});

const formatOrderRecord = (order) => ({
  ...order,
  ...formatFullOrderKey(order),
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
    ":sk": always(CART_PREFIX),
  },
});

const formatOrdersQuery = applySpec({
  KeyConditionExpression: always("PK = :pk and begins_with(SK, :sk)"),
  ExpressionAttributeValues: {
    ":pk": addUserPrefix,
    ":sk": always(ORDER_PREFIX),
  },
});

//exports

export const makeGetCartInput = pipe(formatCartQuery, addTableName);

export const makeGetCartItemInput = pipe(formatCartItemKey, baseGetRecordInput);

export const makeUpsertCartItemInput = pipe(
  formatCartItemRecord,
  baseUpsertRecordInput
);

export const makeGetProductInput = pipe(formatProductKey, baseGetRecordInput);

export const makeGetOrderInput = pipe(formatGerOrderKey, baseGetRecordInput);

export const makeGetOrdersInput = pipe(formatOrdersQuery, addTableName);

export const makeUpsertProductInput = pipe(
  formatProductRecord,
  baseUpsertRecordInput
);

export const makeUpsertOrderInput = pipe(
  formatOrderRecord,
  baseUpsertRecordInput
);

export const makeUpsertCartInput = pipe(
  formatCartRecord,
  baseUpsertRecordInput
);
