import { Request, Response } from "express";
import { Branch } from "../models/branch.model";

// Temporary in-memory storage
let branches: Branch[] = [];

// Get all branches
export const getAllBranches = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Branches fetched successfully",
    data: branches,
  });
};

// Get branch by ID
export const getBranchById = (req: Request, res: Response) => {
  const branch = branches.find(b => b.id === req.params.id);

  if (!branch) {
    return res.status(404).json({ error: "Branch not found" });
  }

  return res.status(200).json({
    message: "Branch fetched successfully",
    data: branch,
  });
};

// Create new branch
export const createBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;

  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields: name, address, phone" });
  }

  const newBranch: Branch = {
    id: Date.now().toString(),
    name,
    address,
    phone,
    createdAt: new Date().toISOString(),
  };

  branches.push(newBranch);

  return res.status(201).json({
    message: "Branch created successfully",
    data: newBranch,
  });
};

// Update branch
export const updateBranch = (req: Request, res: Response) => {
  const index = branches.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Branch not found" });
  }

  branches[index] = {
    ...branches[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    message: "Branch updated successfully",
    data: branches[index],
  });
};

// Delete branch
export const deleteBranch = (req: Request, res: Response) => {
  const index = branches.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Branch not found" });
  }

  const deleted = branches.splice(index, 1)[0];

  return res.status(200).json({
    message: "Branch deleted successfully",
    data: deleted,
  });
};
