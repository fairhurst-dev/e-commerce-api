import { path } from "ramda";
import { confirmSignUp } from "#lib/cognito.js";
import { confirmOTPValidator } from "#lib/validators.js";

export const handler = async (event) => {
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
