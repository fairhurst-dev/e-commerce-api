import {
  applySpec,
  identity,
  length,
  pipe,
  map,
  sum,
  prop,
  concat,
} from "ramda";

const calculateTotalPrice = pipe(map(prop("price")), sum);

const toFixedDecimals = (num) => num.toFixed(2);

const formatTotalPrice = pipe(
  calculateTotalPrice,
  toFixedDecimals,
  concat("$")
);

export const transformCartForClient = applySpec({
  items: identity,
  itemsInCart: length,
  totalPrice: calculateTotalPrice,
  totalFormattedPrice: formatTotalPrice,
});
