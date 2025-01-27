import { prop, pick, pipe, tryCatch, andThen } from "ramda";
import { login } from "#lib/services/cognito/index.js";
import { userValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { catcher, respFormatter } from "#routes/utils.js";

export const loginHandler = tryCatch(
  pipe(
    prop("body"),
    pick(["email", "password"]),
    userValidator,
    login,
    andThen(respFormatter)
  ),
  catcher
);

export const handler = middyfy(loginHandler).use(httpJsonBodyParser());
