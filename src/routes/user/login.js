import { path } from "ramda";
import { login } from "#lib/services/cognito.js";
import { userValidator } from "#lib/utils/validators.js";
import { middyfy } from "#lib/services/middleware.js";

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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(loginHandler);
