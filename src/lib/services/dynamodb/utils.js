import {
  applySpec,
  assoc,
  concat,
  identity,
  pipe,
  always,
  prop,
  any,
  propEq,
} from "ramda";

const addTableName = assoc("TableName", process.env.E_COMMERCE_TABLE);

//keys

const BASE_PREFIX = "#";
const PRODUCT_PREFIX = "PRODUCT#";
const USER_PREFIX = "USER#";
const CART_PREFIX = "CART#";
const CART_ITEM_PREFIX = "CART#ITEM#";
const ORDER_PREFIX = "ORDER#";

const addProductPrefix = concat(PRODUCT_PREFIX);
const addUserPrefix = concat(USER_PREFIX);
const addCartPrefix = concat(CART_PREFIX);
const addCartItemPrefix = concat(CART_ITEM_PREFIX);
const addOrderPrefix = concat(ORDER_PREFIX);

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

const formatOrderKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("cartUUID"), addOrderPrefix),
});

const formatFullOrderKey = applySpec({
  PK: pipe(prop("userUUID"), addUserPrefix),
  SK: pipe(prop("cartUUID"), addOrderPrefix),
});

//record formatters

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

const decorateMustExist = assoc("ConditionExpression", "attribute_exists(PK)");

const baseDeleteRecordInput = pipe(baseGetRecordInput, decorateMustExist);

export const itemIsInCart = (cart, newCartItem) => {
  const newCartItemId = newCartItem.id;
  return pipe(prop("items"), any(propEq(newCartItemId, "id")))(cart);
};

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

//get

export const makeGetCartInput = pipe(formatCartQuery, addTableName);

export const makeGetCartItemInput = pipe(formatCartItemKey, baseGetRecordInput);

export const makeGetProductInput = pipe(formatProductKey, baseGetRecordInput);

export const makeGetOrderInput = pipe(formatOrderKey, baseGetRecordInput);

export const makeGetOrdersInput = pipe(formatOrdersQuery, addTableName);

//delete
export const makeDeleteCartItemInput = pipe(
  formatCartItemKey,
  baseDeleteRecordInput
);

export const makeDeleteCartInput = pipe(formatCartKey, baseDeleteRecordInput);

//upsert
export const makeUpsertProductInput = pipe(
  formatProductRecord,
  baseUpsertRecordInput
);

export const makeUpsertCartItemInput = pipe(
  formatCartItemRecord,
  baseUpsertRecordInput
);

export const makeUpsertCartInput = pipe(
  formatCartRecord,
  baseUpsertRecordInput
);

export const makeUpsertOrderInput = pipe(
  formatOrderRecord,
  baseUpsertRecordInput
);
