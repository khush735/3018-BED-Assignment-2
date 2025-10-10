import Joi from "joi";

export const employeeCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  branchId: Joi.string().required(),
  department: Joi.string().optional(),
});

export const employeeUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  position: Joi.string().min(2).max(50).optional(),
  branchId: Joi.string().optional(),
  department: Joi.string().optional(),
});
