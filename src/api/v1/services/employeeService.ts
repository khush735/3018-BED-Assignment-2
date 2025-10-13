import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../repositories/firestoreRepository';

export interface Employee {
  id: string;
  name: string;
  branchId: string;
  department: string;
  position: string;
}

// List all employees //
export async function listEmployees(): Promise<Employee[]> {
  try {
    const snapshot = await getDocuments('employees');
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Employee, 'id'>)
    }));
  } catch (error) {
    throw new Error('Failed to fetch employees');
  }
}

// Find employee by ID //
export async function findEmployeeById(id: string): Promise<Employee | null> {
  try {
    const doc = await getDocumentById('employees', id);
    if (!doc || !doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<Employee, 'id'>) };
  } catch (error) {
    throw new Error(`Failed to fetch employee with ID ${id}`);
  }
}

// Create a new employee //
export async function createEmployee(payload: Omit<Employee, 'id'>): Promise<Employee> {
  try {
    const id = await createDocument('employees', payload);
    return { id, ...payload };
  } catch (error) {
    throw new Error('Failed to create employee');
  }
}

// Update an existing employee //
export async function updateEmployee(id: string, changes: Partial<Omit<Employee, 'id'>>): Promise<Employee | null> {
  try {
    await updateDocument('employees', id, changes);
    const updated = await findEmployeeById(id);
    return updated;
  } catch (error) {
    throw new Error(`Failed to update employee with ID ${id}`);
  }
}

// Delete an employee //
export async function deleteEmployee(id: string): Promise<boolean> {
  try {
    await deleteDocument('employees', id);
    return true;
  } catch (error) {
    return false;
  }
}

// List employees by branch //
export async function listEmployeesByBranch(branchId: string): Promise<Employee[]> {
  try {
    const all = await listEmployees();
    return all.filter(e => e.branchId === branchId);
  } catch (error) {
    throw new Error('Failed to fetch employees by branch');
  }
}

// List employees by department //
export async function listEmployeesByDepartment(department: string): Promise<Employee[]> {
  try {
    const all = await listEmployees();
    return all.filter(e => e.department.toLowerCase() === department.toLowerCase());
  } catch (error) {
    throw new Error('Failed to fetch employees by department');
  }
}
