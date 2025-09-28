import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService';

export async function createEmployee(req: Request, res: Response) {
  const { name, position, department, email, phone, branchId } = req.body;
  if (!name || !position || !department || !email || !phone || branchId === undefined)
    return res.status(400).json({ error: 'Missing required fields: name, position, department, email, phone, branchId' });

  const created = employeeService.createEmployee({ name, position, department, email, phone, branchId });
  return res.status(201).json(created);
}

export async function getAllEmployees(_req: Request, res: Response) {
  return res.json(employeeService.listEmployees());
}

export async function getEmployeeById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const emp = employeeService.findEmployeeById(id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });
  return res.json(emp);
}

export async function updateEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = employeeService.updateEmployee(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Employee not found' });
  return res.json(updated);
}

export async function deleteEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = employeeService.deleteEmployee(id);
  if (!ok) return res.status(404).json({ error: 'Employee not found' });
  return res.json({ message: 'Employee deleted' });
}

export async function getEmployeesByBranch(req: Request, res: Response) {
  const branchId = Number(req.params.branchId);
  if (!branchId) return res.status(400).json({ error: 'Missing branchId param' });
  return res.json(employeeService.listEmployeesByBranch(branchId));
}

export async function getEmployeesByDepartment(req: Request, res: Response) {
  const department = String(req.params.department || '').trim();
  if (!department) return res.status(400).json({ error: 'Missing department param' });
  return res.json(employeeService.listEmployeesByDepartment(department));
}
