import { path } from "ramda";
import { signup } from "#lib/services/cognito/index.js";
import { userValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

//TODO: functional handler refactor

export const handler = async (e) => {
  console.log(JSON.parse(e.body));
  const event = { body: JSON.parse(e.body) };
  console.log(event);
  const email = path(["body", "email"], event);
  const password = path(["body", "password"], event);
  try {
    const payload = userValidator({ email, password });
    console.log("PAYLOAD", payload);
    await signup(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User has been created",
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

//export const handler = middyfy(signupHandler).use(httpJsonBodyParser());
