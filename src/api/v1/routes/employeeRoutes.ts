import { Router } from 'express';
import * as ctrl from '../controllers/employeeController';

const router = Router();

router.post('/employees', ctrl.createEmployee);
router.get('/employees', ctrl.getAllEmployees);
router.get('/employees/department/:department', ctrl.getEmployeesByDepartment);
router.get('/employees/:id', ctrl.getEmployeeById);
router.put('/employees/:id', ctrl.updateEmployee);
router.delete('/employees/:id', ctrl.deleteEmployee);

export default router;
