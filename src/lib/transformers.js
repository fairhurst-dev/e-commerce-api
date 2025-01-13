import {
  pipe,
  curry,
  sum,
  concat,
  pluck,
  map,
  find,
  complement,
  prop,
  includes,
  filter,
  omit,
  length,
  identity,
  isNil,
  ifElse,
} from "ramda";

//helpers
const sumProp = curry((propName, items) => {
  return pipe(pluck(propName), sum)(items);
});

const toDollars = (num) => num / 100;

const calculateTotal = pipe(sumProp("price"));

const toFixedDecimals = (num) => num.toFixed(2);
const formatPrice = pipe(toDollars, toFixedDecimals, concat("$"));

export const scrubKeys = ifElse(isNil, identity, omit(["PK", "SK", "GSI1PK"]));

export const transformCartForClient = (items) => {
  if (!items.length) {
    return {
      items: [],
      total: 0,
      quantity: 0,
      formattedTotal: "$0.00",
    };
  }
  const isCartItem = pipe(prop("SK"), includes("CART#ITEM#"));

  const cartItems = pipe(filter(isCartItem), map(scrubKeys))(items);
  const baseCart = find(complement(isCartItem), items);

  const total = calculateTotal(cartItems);
  const quantity = length(cartItems);
  const formattedTotal = formatPrice(total);

  return {
    cartUUID: baseCart.cartUUID,
    userUUID: baseCart.userUUID,
    items: cartItems,
    total,
    quantity,
    formattedTotal,
  };
};
