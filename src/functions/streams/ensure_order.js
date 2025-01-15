import { ifElse, path, pipe, propEq } from "ramda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { ensureOrder } from "#lib/services/dynamodb/index.js";

const unmarshallProduct = ifElse(
  propEq("INSERT", "eventName"),
  pipe(path(["dynamodb", "NewImage"]), unmarshall),
  pipe(path(["dynamodb", "OldImage"]), unmarshall)
);

export const handler = async (event) => {
  for (const record of event.Records) {
    console.log("Record:", record);
    try {
      const unmarshalled = unmarshallProduct(record);
      console.log("Unmarshalled:", unmarshalled);
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
