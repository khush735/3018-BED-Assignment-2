import { Router } from "express";
import * as ctrl from "../controllers/branchController";
import * as empCtrl from "../controllers/employeeController";
import { validate } from "../middleware/validate.middleware";
import { createBranchSchema, updateBranchSchema } from "../validation/branch.schema";

const router = Router();

router.get("/", ctrl.getAllBranches);
router.get("/:id", ctrl.getBranchById);
router.get("/:branchId/employees", empCtrl.getEmployeesByBranch);
router.post("/", validate(createBranchSchema), ctrl.createBranch);
router.put("/:id", validate(updateBranchSchema), ctrl.updateBranch);
router.delete("/:id", ctrl.deleteBranch);

export default router;
