import { prop, pick, pipe, tryCatch, andThen } from "ramda";
import { confirmSignUp } from "#lib/services/cognito/index.js";
import { confirmOTPValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { catcher, respFormatter } from "#routes/utils.js";

const confirmHandler = tryCatch(
  pipe(
    prop("body"),
    pick(["email", "otp"]),
    confirmOTPValidator,
    confirmSignUp,
    andThen(respFormatter)
  ),
  catcher
);

export const handler = middyfy(confirmHandler).use(httpJsonBodyParser());
