import { path, pipe } from "ramda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ensureOrder } from "#lib/services/dynamodb/index.js";

const unmarshallProduct = pipe(path(["dynamodb", "NewImage"]), unmarshall);

export const handler = async (event) => {
  for (const record of event.Records) {
    try {
      const unmarshalled = unmarshallProduct(record);
      if (unmarshalled.SK.includes("CART#ITEM")) {
        await ensureOrder(unmarshalled);
      } else {
        console.log("Not a cart update");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return true;
};
