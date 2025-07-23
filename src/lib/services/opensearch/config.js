export const INDEX_NAME = "products";
export const PRODUCTS_MAPPINGS = {
  dynamic: "strict",
  properties: {
    categories: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    description: {
      type: "text",
    },
    id: {
      type: "keyword",
    },
    msrp: {
      type: "integer",
    },
    name: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    price: {
      type: "integer",
    },
    sku: {
      type: "keyword",
    },
    stock: {
      type: "integer",
    },
  },
};
