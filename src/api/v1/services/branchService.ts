import { Branch, getBranches } from '../../../data/branches';

export function listBranches(): Branch[] {
  return getBranches();
}

export function findBranchById(id: number): Branch | undefined {
  return getBranches().find(b => b.id === id);
}

export function createBranch(payload: Omit<Branch, 'id'>): Branch {
  const branches = getBranches();
  const nextId = branches.length ? Math.max(...branches.map(b => b.id)) + 1 : 1;
  const newBranch: Branch = { id: nextId, ...payload };
  branches.push(newBranch);
  return newBranch;
}

export function updateBranch(id: number, changes: Partial<Omit<Branch, 'id'>>): Branch | null {
  const branches = getBranches();
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return null;
  branches[idx] = { ...branches[idx], ...changes };
  return branches[idx];
}

export function deleteBranch(id: number): boolean {
  const branches = getBranches();
  const idx = branches.findIndex(b => b.id === id);
  if (idx === -1) return false;
  branches.splice(idx, 1);
  return true;
}
