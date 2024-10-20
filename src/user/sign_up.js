import { path } from "ramda";
import { signUp } from "#lib/cognito.js";
import { signupValidator } from "#lib/validators.js";
export const handler = async (event) => {
  const email = path(["body", "email"], event);
  const password = path(["body", "password"], event);
  try {
    const payload = signupValidator({ email, password });
    await signUp(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User signed up" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
