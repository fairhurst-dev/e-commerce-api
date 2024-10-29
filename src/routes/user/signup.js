import { path } from "ramda";
import { signup } from "#lib/services/cognito.js";
import { userValidator } from "#lib/utils/validators.js";
import { middyfy } from "#lib/services/middleware.js";

const signupHandler = async (event) => {
  const email = path(["body", "email"], event);
  const password = path(["body", "password"], event);
  try {
    const payload = userValidator({ email, password });
    await signup(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User has been created",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(signupHandler);
