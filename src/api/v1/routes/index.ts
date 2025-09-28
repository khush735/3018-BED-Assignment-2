import { Router } from 'express';
import employeeRoutes from './employeeRoutes';
import branchRoutes from './branchRoutes';

const router = Router();
router.use('/', employeeRoutes);
router.use('/', branchRoutes);

export default router;
