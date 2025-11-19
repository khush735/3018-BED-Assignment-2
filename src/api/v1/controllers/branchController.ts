import { Request, Response } from "express";
import * as service from "../services/branchService";

export const getAllBranches = async (_: Request, res: Response) => {
  try {
    const data = await service.listBranches();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: "Failed to get branches" });
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const data = await service.findBranchById(req.params.id);
    if (!data) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ error: "Error fetching branch" });
  }
};

export const createBranch = async (req: Request, res: Response) => {
  try {
    const data = await service.createBranch(req.body);
    res.status(201).json({ data });
  } catch (e) {
    res.status(400).json({ error: "Error creating branch" });
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const data = await service.updateBranch(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).json({ error: "Error updating branch" });
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const branch = await service.findBranchById(req.params.id);
    if (!branch) return res.status(404).json({ error: "Branch not found" });

    await service.deleteBranchById(req.params.id);
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Error deleting branch" });
  }
};
