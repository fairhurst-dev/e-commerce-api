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
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    msrp: {
      type: "float",
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
      type: "float",
    },
    sku: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    stock: {
      type: "integer",
    },
  },
};
