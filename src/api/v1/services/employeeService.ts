import {
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { getEmployees } from "../../../data/employees";

export interface Employee {
  id: string;
  name: string;
  branchId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
}

// List all employees
export const listEmployees = async (): Promise<Employee[]> => {
  return getEmployees().map((e: any) => ({
    id: e.id.toString(),
    name: e.name,
    branchId: e.branchId.toString(),
    department: e.department,
    position: e.position,
    email: e.email,
    phone: e.phone,
  }));
};

// Find employee by ID
export const findEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await getDocumentById("employees", id);
  return doc ? { id: doc.id, ...(doc.data() as Omit<Employee, "id">) } : null;
};

// Create employee
export const createEmployee = async (
  data: Omit<Employee, "id">
): Promise<Employee> => {
  const id = await createDocument("employees", data);
  return { id, ...data };
};

// Update employee
export const updateEmployee = async (
  id: string,
  data: Partial<Omit<Employee, "id">>
): Promise<Employee | null> => {
  const emp = await findEmployeeById(id);
  if (!emp) return null;

  await updateDocument("employees", id, data);
  return findEmployeeById(id);
};

// Delete employee
export const deleteEmployeeById = async (id: string): Promise<boolean> => {
  await deleteDocument("employees", id);
  return true;
};

// List employees by branch
export const listEmployeesByBranch = async (
  branchId: string
): Promise<Employee[]> => {
  const all = await listEmployees();
  return all.filter((e) => e.branchId === branchId);
};

// List employees by department
export const listEmployeesByDepartment = async (
  department: string
): Promise<Employee[]> => {
  const all = await listEmployees();
  return all.filter(
    (e) => e.department.toLowerCase() === department.toLowerCase()
  );
};
