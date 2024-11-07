export const sampleQueryResponse = {
  body: {
    took: 105,
    timed_out: false,
    _shards: {
      total: 0,
      successful: 0,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 3,
        relation: "eq",
      },
      max_score: 1,
      hits: [
        {
          _index: "products",
          _id: "1f8b56bc-9370-4a0c-b8ed-d4f9a28d97c4",
          _score: 1,
          _source: {
            price: 99.99,
            msrp: 159.99,
            name: "Wireless Bluetooth Headphones",
            description:
              "High-quality wireless headphones with noise cancellation.",
            categories: ["Electronics", "Audio"],
            id: "1f8b56bc-9370-4a0c-b8ed-d4f9a28d97c4",
            sku: "WH-12345",
            stock: 25,
          },
        },
        {
          _index: "products",
          _id: "2e4a41d3-b99c-4b92-b817-3c5b9087c848",
          _score: 1,
          _source: {
            price: 19.95,
            msrp: 24.95,
            name: "Stainless Steel Water Bottle",
            description:
              "Eco-friendly, reusable water bottle with a 1-liter capacity.",
            categories: ["Home & Kitchen", "Sports"],
            id: "2e4a41d3-b99c-4b92-b817-3c5b9087c848",
            sku: "SWB-67890",
            stock: 100,
          },
        },
      ],
    },
  },
};
