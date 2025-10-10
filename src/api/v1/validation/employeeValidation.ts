import Joi from 'joi';

// Validation schema for creating a new employee
export const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Employee name is required',
    'string.min': 'Employee name must be at least 2 characters long',
    'string.max': 'Employee name cannot exceed 100 characters'
  }),
  position: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Position is required',
    'string.min': 'Position must be at least 2 characters long',
    'string.max': 'Position cannot exceed 100 characters'
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  phone: Joi.string().trim().pattern(/^\+?[\d\s-()]+$/).required().messages({
    'string.pattern.base': 'Please provide a valid phone number',
    'string.empty': 'Phone number is required'
  }),
  branchId: Joi.string().trim().required().messages({
    'string.empty': 'Branch ID is required'
  }),
  department: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Department is required',
    'string.min': 'Department must be at least 2 characters long',
    'string.max': 'Department cannot exceed 50 characters'
  }),
  salary: Joi.number().min(0).required().messages({
    'number.base': 'Salary must be a number',
    'number.min': 'Salary cannot be negative',
    'any.required': 'Salary is required'
  })
});

// Validation schema for updating an existing employee
export const updateEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).messages({
    'string.min': 'Employee name must be at least 2 characters long',
    'string.max': 'Employee name cannot exceed 100 characters'
  }),
  position: Joi.string().trim().min(2).max(100).messages({
    'string.min': 'Position must be at least 2 characters long',
    'string.max': 'Position cannot exceed 100 characters'
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Please provide a valid email address'
  }),
  phone: Joi.string().trim().pattern(/^\+?[\d\s-()]+$/).messages({
    'string.pattern.base': 'Please provide a valid phone number'
  }),
  branchId: Joi.string().trim(),
  department: Joi.string().trim().min(2).max(50).messages({
    'string.min': 'Department must be at least 2 characters long',
    'string.max': 'Department cannot exceed 50 characters'
  }),
  salary: Joi.number().min(0).messages({
    'number.base': 'Salary must be a number',
    'number.min': 'Salary cannot be negative'
  })
// Ensure at least one field is provided for update 
}).min(1); 

