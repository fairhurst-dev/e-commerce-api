import { path } from "ramda";
import { confirmSignUp } from "#lib/services/cognito/index.js";
import { confirmOTPValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export const confirmHandler = async (event) => {
  const email = path(["body", "email"], event);
  const otp = path(["body", "otp"], event);
  try {
    const payload = confirmOTPValidator({ email, otp });

    await confirmSignUp(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User confirmed",
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

export const handler = middyfy(confirmHandler).use(httpJsonBodyParser());
