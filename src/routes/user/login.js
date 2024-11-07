import { path } from "ramda";
import { login } from "#lib/services/cognito/index.js";
import { userValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const loginHandler = async (event) => {
  const email = path(["body", "email"], event);
  const password = path(["body", "password"], event);
  try {
    const payload = userValidator({ email, password });

    const response = await login(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User logged in",
        response,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(loginHandler).use(httpJsonBodyParser());
