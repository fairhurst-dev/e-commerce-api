import { hasPath, ifElse, path, pipe, prop, includes, isNotNil } from "ramda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { indexProduct } from "#lib/services/opensearch/index.js";

const unmarshallProduct = pipe(path(["dynamodb", "NewImage"]), unmarshall);

const unmarshallNewImage = ifElse(
  hasPath(["dynamodb", "NewImage"]),
  unmarshallProduct,
  () => {
    console.log("ignore old images");
  }
);

const imageExists = ifElse(
  isNotNil,
  pipe(prop("PK"), includes("PRODUCT")),
  () => {
    console.log("Not a product");
  }
);

export const handler = async (event) => {
  for (const record of event.Records) {
    try {
      const unmarshalled = unmarshallNewImage(record);
      if (imageExists(unmarshalled)) {
        await indexProduct(unmarshalled);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return true;
};
