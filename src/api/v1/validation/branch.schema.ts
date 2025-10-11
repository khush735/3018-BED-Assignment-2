import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\d{3}-\d{3}-\d{4}$/)
    .required(),
});

export const updateBranchSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
});
