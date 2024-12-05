import {
  applySpec,
  identity,
  pipe,
  curry,
  sum,
  prop,
  concat,
  assoc,
  pluck,
  multiply,
} from "ramda";

const sumProp = curry((propName, items) => {
  return pipe(pluck(propName), sum)(items);
});
const calculateSubtotal = sumProp("price");
const calculateCartQuantity = sumProp("quantity");

const calculateTotalPrice = pipe(calculateSubtotal, multiply(1.07));

const toFixedDecimals = (num) => num.toFixed(2);
const formatPrice = pipe(toFixedDecimals, concat("$"));

const decorateFormattedPrices = pipe(
  assoc("formattedSubtotal", pipe(prop("subtotal"), formatPrice)),
  assoc("formattedTotal", pipe(prop("total"), formatPrice))
);

export const transformCartForClient = applySpec({
  items: identity,
  itemsInCart: calculateCartQuantity,
  subtotal: calculateSubtotal,
  total: calculateTotalPrice,
});
