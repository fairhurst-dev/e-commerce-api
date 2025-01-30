import { prop, pick, pipe, tryCatch, andThen, always } from "ramda";
import { signup } from "#lib/services/cognito/index.js";
import { userValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { catcher, respFormatter } from "#routes/utils.js";

const signupHandler = tryCatch(
  pipe(
    prop("body"),
    pick(["email", "password"]),
    userValidator,
    signup,
    andThen(pipe(always("User Signed Up"), respFormatter))
  ),
  catcher
);

export const handler = middyfy(signupHandler).use(httpJsonBodyParser());
