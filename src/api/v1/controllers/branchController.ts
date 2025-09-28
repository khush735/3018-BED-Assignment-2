import { Request, Response } from 'express';
import * as branchService from '../services/branchService';

export async function createBranch(req: Request, res: Response) {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) return res.status(400).json({ error: 'Missing required fields: name, address, phone' });
  const created = branchService.createBranch({ name, address, phone });
  return res.status(201).json(created);
}

export async function getAllBranches(_req: Request, res: Response) {
  return res.json(branchService.listBranches());
}

export async function getBranchById(req: Request, res: Response) {
  const id = Number(req.params.id);
  // Sanitize and validate ID
  if (!Number.isInteger(id) || id <= 0) 
    return res.status(400).json({ error: 'Invalid id parameter' });

  const branch = branchService.findBranchById(id);
  if (!branch) return res.status(404).json({ error: 'Branch not found' });
  return res.json(branch);
}

export async function updateBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  // Sanitize and validate ID
  if (!Number.isInteger(id) || id <= 0) 
    return res.status(400).json({ error: 'Invalid id parameter' });

  const updated = branchService.updateBranch(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Branch not found' });
  return res.json(updated);
}

export async function deleteBranch(req: Request, res: Response) {
  const id = Number(req.params.id);
  // Sanitize and validate ID
  if (!Number.isInteger(id) || id <= 0) 
    return res.status(400).json({ error: 'Invalid id parameter' });

  const ok = branchService.deleteBranch(id);
  if (!ok) return res.status(404).json({ error: 'Branch not found' });
  return res.json({ message: 'Branch deleted' });
}
