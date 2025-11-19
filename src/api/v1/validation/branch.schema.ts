import Joi from "joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *         name:
 *           type: string
 *           description: Name of the branch
 *         address:
 *           type: string
 *           description: Physical address of the branch
 *         phone:
 *           type: string
 *           pattern: '^\d{3}-\d{3}-\d{4}$'
 *           description: Phone number in XXX-XXX-XXXX format
 *       example:
 *         id: "branch123"
 *         name: "Main Office"
 *         address: "123 Business St, City, State 12345"
 *         phone: "555-123-4567"
 *
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the branch
 *         address:
 *           type: string
 *           description: Physical address of the branch
 *         phone:
 *           type: string
 *           pattern: '^\d{3}-\d{3}-\d{4}$'
 *           description: Phone number in XXX-XXX-XXXX format
 *       example:
 *         name: "Downtown Branch"
 *         address: "456 Commerce Ave, Downtown, State 67890"
 *         phone: "555-987-6543"
 *
 *     UpdateBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the branch
 *         address:
 *           type: string
 *           description: Physical address of the branch
 *         phone:
 *           type: string
 *           pattern: '^\d{3}-\d{3}-\d{4}$'
 *           description: Phone number in XXX-XXX-XXXX format
 *       example:
 *         name: "Downtown Branch"
 *         address: "456 Commerce Ave, Downtown, State 67890"
 *         phone: "555-987-6543"
 */

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
