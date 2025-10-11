import { Router } from "express";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
  getAllBranches,
} from "../controllers/branchController";
import { validate } from "../middleware/validate.middleware";
import { createBranchSchema, updateBranchSchema } from "../validation/branch.schema";

const router = Router();

// Add validation middleware to POST and PUT
router.get("/", getAllBranches);
router.get("/:id", getBranchById);
router.post("/", validate(createBranchSchema), createBranch);
router.put("/:id", validate(updateBranchSchema), updateBranch);
router.delete("/:id", deleteBranch);

export default router;
