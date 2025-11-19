import { Request, Response } from "express";
import * as service from "../services/employeeService";
import * as branchService from "../services/branchService";

export const getAllEmployees = async (_: Request, res: Response) => {
  try {
    const data = await service.listEmployees();
    res.status(200).json({ data });
  } catch (e) {
    console.error("Error getting all employees:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    res.status(500).json({ error: `Failed to get employees: ${errorMessage}` });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const data = await service.findEmployeeById(req.params.id);
    if (!data) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ data });
  } catch (e) {
    console.error("Error fetching employee by ID:", e);
    res.status(500).json({ error: "Error fetching employee" });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const data = await service.createEmployee(req.body);
    res.status(201).json({ data });
  } catch (e) {
    console.error("Error creating employee:", e);
    res.status(400).json({ error: "Error creating employee" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const data = await service.updateEmployee(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ data });
  } catch (e) {
    console.error("Error updating employee:", e);
    res.status(400).json({ error: "Error updating employee" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const emp = await service.findEmployeeById(req.params.id);
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    await service.deleteEmployeeById(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Error deleting employee" });
  }
};

//  Get employees by department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.params;
    if (!department) return res.status(400).json({ error: "Department is required" });

    const data = await service.listEmployeesByDepartment(department);
    res.status(200).json({ data });
  } catch (e) {
    console.error("Error fetching employees by department:", e);
    res.status(400).json({ error: "Error fetching employees by department" });
  }
};

// Get employees by branch
export const getEmployeesByBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    if (!branchId) return res.status(400).json({ error: "Branch ID is required" });

    // Verify branch exists
    const branchExists = await branchService.findBranchById(branchId);
    if (!branchExists) return res.status(404).json({ error: "Branch not found" });

    const data = await service.listEmployeesByBranch(branchId);
    res.status(200).json({ data });
  } catch (e) {
    console.error("Error fetching employees by branch:", e);
    res.status(400).json({ error: "Error fetching employees by branch" });
  }
};
