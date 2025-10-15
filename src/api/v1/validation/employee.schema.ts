import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  branchId: Joi.alternatives().try(Joi.string(), Joi.number()).required()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string(),
  position: Joi.string(),
  department: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  branchId: Joi.alternatives().try(Joi.string(), Joi.number())
});
