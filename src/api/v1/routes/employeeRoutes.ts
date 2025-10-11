import { Router } from 'express';
import * as ctrl from '../controllers/employeeController';
import { validate } from '../middleware/validate.middleware';
import { createEmployeeSchema, updateEmployeeSchema } from '../validation/employee.schema';

const router = Router();

// Add validation middleware to POST and PUT
router.post('/employees', validate(createEmployeeSchema), ctrl.createEmployee);
router.get('/employees', ctrl.getAllEmployees);
router.get('/employees/department/:department', ctrl.getEmployeesByDepartment);
router.get('/employees/:id', ctrl.getEmployeeById);
router.put('/employees/:id', validate(updateEmployeeSchema), ctrl.updateEmployee);
router.delete('/employees/:id', ctrl.deleteEmployee);

export default router;
