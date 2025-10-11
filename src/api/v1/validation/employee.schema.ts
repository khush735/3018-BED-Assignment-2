import Joi from "joi";

// Schema for creating a new employee
export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  branchId: Joi.string().required(),
});

// Schema for updating an existing employee
export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  position: Joi.string(),
  department: Joi.string(),
  branchId: Joi.string(),
});
