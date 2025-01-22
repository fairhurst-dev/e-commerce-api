import { andThen, pick, pipe, prop, tryCatch } from "ramda";
import { refresh } from "#lib/services/cognito/index.js";
import { refreshValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { catcher, respFormatter } from "#routes/utils.js";

const refreshHandler = tryCatch(
  pipe(
    prop("body"),
    pick(["refreshToken", "deviceKey"]),
    refreshValidator,
    refresh,
    andThen(respFormatter)
  ),
  catcher
);

export const handler = middyfy(refreshHandler).use(httpJsonBodyParser());
