import Joi from "joi";
import { randomUUID } from "crypto";
export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?`~]/)
    .message('"password" must contain at least one special character'),
});

export const confirmOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
  deviceKey: Joi.string().optional(),
});

const baseProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  msrp: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required().default(0),
  categories: Joi.array().items(Joi.string()).default([]),
  sku: Joi.string().required(),
});

export const newProductSchema = baseProductSchema.keys({
  id: Joi.string().default(randomUUID()),
});

export const completeProductSchema = baseProductSchema.keys({
  id: Joi.string().required(),
});

export const cartItemSchema = completeProductSchema.keys({
  quantity: Joi.number().integer().min(1).required(),
  userUUID: Joi.string().required(),
  cartUUID: Joi.string(),
});
