import { assoc, converge, pipe, prop, identity } from "ramda";

export const decorateFormattedPrice = converge(assoc("formattedPrice"), [
  pipe(prop("price"), (price) => price / 100), // Convert price to dollars
  identity, // Pass the original object
]);
