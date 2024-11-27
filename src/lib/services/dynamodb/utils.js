import { applySpec, assoc, concat, identity, pipe } from "ramda";

const addTableName = assoc("TableName", process.env.PRODUCTS_TABLE);

const formatProductKey = concat("PRODUCT#");
const formatCartKey = concat("CART#");

const formatProductRecord = (product) => ({
  ...product,
  PK: formatProductKey(product.id),
});

const formatCartRecord = (cart) => ({
  ...cart,
  PK: formatCartKey(cart.id),
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
      PK: identity,
    },
  }),
  addTableName
);

export const makeUpsertCartInput = pipe(
  formatCartRecord,
  baseUpsertRecordInput
);
export const makeUpsertProductInput = pipe(
  formatProductRecord,
  baseUpsertRecordInput
);

export const makeGetProductInput = pipe(formatProductKey, baseGetRecordInput);
export const makeGetCartInput = pipe(formatCartKey, baseGetRecordInput);
