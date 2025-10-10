import Joi from 'joi';

// Validation schema for creating a new branch
export const createBranchSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Branch name is required',
    'string.min': 'Branch name must be at least 2 characters long',
    'string.max': 'Branch name cannot exceed 100 characters'
  }),
  address: Joi.string().trim().min(5).max(200).required().messages({
    'string.empty': 'Address is required',
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address cannot exceed 200 characters'
  }),
  phone: Joi.string().trim().pattern(/^\+?[\d\s-()]+$/).required().messages({
    'string.pattern.base': 'Please provide a valid phone number',
    'string.empty': 'Phone number is required'
  }),
  manager: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Manager name is required',
    'string.min': 'Manager name must be at least 2 characters long',
    'string.max': 'Manager name cannot exceed 100 characters'
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Manager email is required'
  })
});

// Validation schema for updating an existing branch
export const updateBranchSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).messages({
    'string.min': 'Branch name must be at least 2 characters long',
    'string.max': 'Branch name cannot exceed 100 characters'
  }),
  address: Joi.string().trim().min(5).max(200).messages({
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address cannot exceed 200 characters'
  }),
  phone: Joi.string().trim().pattern(/^\+?[\d\s-()]+$/).messages({
    'string.pattern.base': 'Please provide a valid phone number'
  }),
  manager: Joi.string().trim().min(2).max(100).messages({
    'string.min': 'Manager name must be at least 2 characters long',
    'string.max': 'Manager name cannot exceed 100 characters'
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Please provide a valid email address'
  })
// Ensure at least one field is provided for update
}).min(1); 