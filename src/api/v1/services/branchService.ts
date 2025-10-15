import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

// Get all branches
export const listBranches = async (): Promise<Branch[]> => {
  const snapshot = await getDocuments("branches");
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Branch, "id">),
  }));
};

// Get single branch
export const findBranchById = async (id: string): Promise<Branch | null> => {
  const doc = await getDocumentById("branches", id);
  return doc ? { id: doc.id, ...(doc.data() as Omit<Branch, "id">) } : null;
};

// Create new branch
export const createBranch = async (
  data: Omit<Branch, "id">
): Promise<Branch> => {
  const id = await createDocument("branches", data);
  return { id, ...data };
};

// Update branch
export const updateBranch = async (
  id: string,
  data: Partial<Omit<Branch, "id">>
): Promise<Branch | null> => {
  const branch = await findBranchById(id);
  if (!branch) return null;

  await updateDocument("branches", id, data);
  return findBranchById(id);
};

// Delete branch
export const deleteBranchById = async (id: string): Promise<boolean> => {
  await deleteDocument("branches", id);
  return true;
};
