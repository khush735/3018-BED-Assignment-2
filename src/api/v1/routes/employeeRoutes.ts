import { Router } from "express";
import * as ctrl from "../controllers/employeeController";
import { validate } from "../middleware/validate.middleware";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../validation/employee.schema";

const router = Router();

// Specific logical routes FIRST
router.get("/branch/:branchId", ctrl.getEmployeesByBranch);
router.get("/department/:department", ctrl.getEmployeesByDepartment);

// Core CRUD routes
router.post("/", validate(createEmployeeSchema), ctrl.createEmployee);
router.get("/", ctrl.getAllEmployees);
router.get("/:id", ctrl.getEmployeeById);
router.put("/:id", validate(updateEmployeeSchema), ctrl.updateEmployee);
router.delete("/:id", ctrl.deleteEmployee);

export default router;
