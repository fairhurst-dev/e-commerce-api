import { map, pipe, prop, join } from "ramda";
import { user, confirmSignUp } from "#lib/schemas.js";

const joiDefaults = {
  abortEarly: false,
};

const formatError = pipe(prop("details"), map(prop("message")), join(", "));

//TODO: make these all functional

export const signupValidator = ({ email, password }) => {
  const { error, value } = user.validate({ email, password }, joiDefaults);
  if (error) {
    console.log("my error", error);
    throw new Error(formatError(error));
  }
  return value;
};

export const confirmSignUpValidator = ({ email, otp }) => {
  const { error, value } = confirmSignUp.validate({ email, otp }, joiDefaults);
  if (error) {
    throw new Error(formatError(error));
  }
  return value;
};
