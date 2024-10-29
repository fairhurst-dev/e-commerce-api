import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(), //TODO: enforce password complexity
});

export const confirmOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
  deviceKey: Joi.string().optional(),
});
