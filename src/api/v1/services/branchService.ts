import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../repositories/firestoreRepository';


export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
}

// List all branches //
export async function listBranches(): Promise<Branch[]> {
  try {
    const snapshot = await getDocuments('branches');
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Branch, 'id'>)
    }));
  } catch (error) {
    throw new Error('Failed to fetch branches');
  }
}

// Find branch by ID //
export async function findBranchById(id: string): Promise<Branch | null> {
  try {
    const doc = await getDocumentById('branches', id);
    if (!doc || !doc.exists) return null;
    return { id: doc.id, ...(doc.data() as Omit<Branch, 'id'>) };
  } catch (error) {
    throw new Error(`Failed to fetch branch with ID ${id}`);
  }
}

// Create a new branch //
export async function createBranch(payload: Omit<Branch, 'id'>): Promise<Branch> {
  try {
    const id = await createDocument('branches', payload);
    return { id, ...payload };
  } catch (error) {
    throw new Error('Failed to create branch');
  }
}

// Update an existing branch //
export async function updateBranch(id: string, changes: Partial<Omit<Branch, 'id'>>): Promise<Branch | null> {
  try {
    await updateDocument('branches', id, changes);
    const updated = await findBranchById(id);
    return updated;
  } catch (error) {
    throw new Error(`Failed to update branch with ID ${id}`);
  }
}

// Delete a branch //
export async function deleteBranch(id: string): Promise<boolean> {
  try {
    await deleteDocument('branches', id);
    return true;
  } catch (error) {
    return false;
  }
}
