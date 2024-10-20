import Joi from "joi";

export const user = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
