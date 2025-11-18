import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the user
 *           example: "user_abc123"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the user
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "john@example.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: User's role in the system
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *           example: "2024-01-15T10:30:00Z"
 * 
 *     UserCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           format: email
 *           example: "jane@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           example: "securePassword123"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 */

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').default('user')
});

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};