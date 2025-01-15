import {
  pipe,
  curry,
  sum,
  concat,
  pluck,
  multiply,
  omit,
  length,
  identity,
  isNil,
  ifElse,
} from "ramda";

const sumProp = curry((propName, items) => {
  return pipe(pluck(propName), sum)(items);
});

const toDollars = (num) => num / 100;

const calculateSubtotal = pipe(sumProp("price"));
const calculateTotalPrice = pipe(calculateSubtotal, multiply(1.07), Math.round);

const calculateCartQuantity = length;

const toFixedDecimals = (num) => num.toFixed(2);
const formatPrice = pipe(toDollars, toFixedDecimals, concat("$"));

export const scrubKeys = ifElse(isNil, identity, omit(["PK", "SK", "GSI1PK"]));

export const transformCartForClient = (items) => {
  if (!items.length) {
    return {
      items: [],
      subtotal: 0,
      total: 0,
      quantity: 0,
      formattedSubtotal: "$0.00",
      formattedTotal: "$0.00",
    };
  }
  const cartItems = [];
  let baseCart = null;
  items.map((i) => {
    if (i.SK.includes("CART#ITEM#")) cartItems.push(scrubKeys(i));
    else baseCart = i;
  });
  const subtotal = calculateSubtotal(cartItems);
  const total = calculateTotalPrice(cartItems);
  const quantity = calculateCartQuantity(cartItems);
  const formattedSubtotal = formatPrice(subtotal);
  const formattedTotal = formatPrice(total);
  return {
    cartUUID: baseCart.cartUUID,
    userUUID: baseCart.userUUID,
    items: cartItems,
    subtotal,
    total,
    quantity,
    formattedSubtotal,
    formattedTotal,
  };
};
