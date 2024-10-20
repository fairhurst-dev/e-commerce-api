import { map, pipe, prop, join } from "ramda";
import { user } from "#lib/schemas.js";

const joiDefaults = {
  abortEarly: false,
};

const formatError = pipe(prop("details"), map(prop("message")), join(", "));

export const signupValidator = ({ email, password }) => {
  const { error, value } = user.validate({ email, password }, joiDefaults);
  if (error) {
    console.log("my error", error);
    throw new Error(formatError(error));
  }
  return value;
};
