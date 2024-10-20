import { path } from "ramda";
import { signup } from "#lib/cognito.js";
import { userValidator } from "#lib/validators.js";

export const handler = async (event) => {
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
