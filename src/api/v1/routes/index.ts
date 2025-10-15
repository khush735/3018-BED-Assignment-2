import { Router } from "express";
import branchRoutes from "../routes/branchRoutes";
import employeeRoutes from "../routes/employeeRoutes";

const router = Router();

router.use("/branches", branchRoutes);
router.use("/employees", employeeRoutes);

export default router;
