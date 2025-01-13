import { path, pipe } from "ramda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { indexProduct } from "#lib/services/opensearch/index.js";

const unmarshallProduct = pipe(path(["dynamodb", "NewImage"]), unmarshall);

export const handler = async (event) => {
  for (const record of event.Records) {
    try {
      const unmarshalled = unmarshallProduct(record);
      if (unmarshalled.PK.includes("PRODUCT")) {
        await indexProduct(unmarshalled);
      } else {
        console.log("Record is not a product");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return true;
};
