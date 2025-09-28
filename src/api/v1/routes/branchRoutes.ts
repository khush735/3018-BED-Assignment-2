import { Router } from 'express';
import * as ctrl from '../controllers/branchController';
import * as empCtrl from '../controllers/employeeController';

const router = Router();

router.post('/branches', ctrl.createBranch);
router.get('/branches', ctrl.getAllBranches);
router.get('/branches/:id', ctrl.getBranchById);
router.put('/branches/:id', ctrl.updateBranch);
router.delete('/branches/:id', ctrl.deleteBranch);

// logical: employees in a branch
router.get('/branches/:branchId/employees', empCtrl.getEmployeesByBranch);

export default router;
