import { path } from "ramda";
import { confirmSignUp } from "#lib/services/cognito.js";
import { confirmOTPValidator } from "#lib/utils/validators.js";
import { middyfy } from "#lib/services/middleware.js";

const confirmHandler = async (event) => {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(confirmHandler);
