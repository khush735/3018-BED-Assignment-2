import { Employee, getEmployees } from '../../../data/employees';

export function listEmployees(): Employee[] {
  return getEmployees();
}

export function findEmployeeById(id: number): Employee | undefined {
  return getEmployees().find(e => e.id === id);
}

export function createEmployee(payload: Omit<Employee, 'id'>): Employee {
  const employees = getEmployees();
  const nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
  const newEmp: Employee = { id: nextId, ...payload };
  employees.push(newEmp);
  return newEmp;
}

export function updateEmployee(id: number, changes: Partial<Omit<Employee, 'id'>>): Employee | null {
  const employees = getEmployees();
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return null;
  employees[idx] = { ...employees[idx], ...changes };
  return employees[idx];
}

export function deleteEmployee(id: number): boolean {
  const employees = getEmployees();
  const idx = employees.findIndex(e => e.id === id);
  if (idx === -1) return false;
  employees.splice(idx, 1);
  return true;
}

export function listEmployeesByBranch(branchId: number): Employee[] {
  return getEmployees().filter(e => e.branchId === branchId);
}

export function listEmployeesByDepartment(department: string): Employee[] {
  return getEmployees().filter(e => e.department.toLowerCase() === department.toLowerCase());
}
