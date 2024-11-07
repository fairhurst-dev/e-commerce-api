import { applySpec, assoc, identity, pipe } from "ramda";

const formatTableName = assoc("TableName", process.env.PRODUCTS_TABLE);

export const makeUpsertProductInput = pipe(
  applySpec({
    Item: identity,
  }),
  formatTableName
);

export const makeGetProductInput = pipe(
  applySpec({
    Key: {
      id: identity,
    },
  }),
  formatTableName
);
