import Joi from "joi";

export const branchCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{7,20}$/).optional(),
});

export const branchUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  address: Joi.string().min(5).optional(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{7,20}$/).optional()
});
