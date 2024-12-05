export const newProductSample = {
  name: "product",
  description: "description",
  price: 1,
  msrp: 2,
  stock: 3,
  categories: ["category"],
  sku: "test-sku",
};

export const completeProductSample = {
  name: "product",
  description: "description",
  price: 1,
  msrp: 2,
  stock: 3,
  id: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
  sku: "test-sku",
};

export const cartItemSample = {
  ...completeProductSample,
  quantity: 3,
  userUUID: "1b4e28ba-2fa1-11d2-883f-0016d3cca427",
};
