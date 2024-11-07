import { map, pipe, prop, join, curry } from "ramda";
import {
  userSchema,
  confirmOTPSchema,
  refreshSchema,
  newProductSchema,
  updateProductSchema,
} from "#lib/schemas.js";

const joiDefaults = {
  abortEarly: false,
};

const formatError = pipe(prop("details"), map(prop("message")), join(", "));

const baseValidator = curry((schema, data) => {
  const { error, value } = schema.validate(data, joiDefaults);
  if (error) {
    throw new Error(formatError(error));
  }
  return value;
});

export const userValidator = baseValidator(userSchema);

export const confirmOTPValidator = baseValidator(confirmOTPSchema);

export const refreshValidator = baseValidator(refreshSchema);

export const newProductValidator = baseValidator(newProductSchema);

export const updateProductValidator = baseValidator(updateProductSchema);
