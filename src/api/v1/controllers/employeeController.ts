import { Request, Response } from "express";
import { Employee } from "../models/employee.model";

let employees: Employee[] = [];

export const getAllEmployees = (req: Request, res: Response) => {
  res.status(200).json({ message: "Success", data: employees });
};

export const getEmployeeById = (req: Request, res: Response) => {
  const employee = employees.find(e => e.id === req.params.id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }
  res.status(200).json({ message: "Success", data: employee });
};

export const createEmployee = (req: Request, res: Response) => {
  const newEmployee: Employee = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  employees.push(newEmployee);
  res.status(201).json({ message: "Employee created", data: newEmployee });
};

export const updateEmployee = (req: Request, res: Response) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  employees[index] = { ...employees[index], ...req.body, updatedAt: new Date().toISOString() };
  res.status(200).json({ message: "Employee updated", data: employees[index] });
};

export const deleteEmployee = (req: Request, res: Response) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Employee not found" });
  }
  const deleted = employees.splice(index, 1);
  res.status(200).json({ message: "Employee deleted", data: deleted[0] });
};
export function getEmployeesByDepartment(arg0: string, getEmployeesByDepartment: any) {
    throw new Error('Function not implemented.');
}

