import request from 'supertest';
import app from '../src/app';
import * as firestoreRepo from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

beforeEach(async () => {
  jest.clearAllMocks();

  // Mock data storage
  const branchData: Record<string, any> = {
    '1': {
      name: 'Seed Branch 1',
      address: '123 Seed St',
      phone: '111-222-3333'
    },
    '2': {
      name: 'Seed Branch 2',
      address: '456 Seed Ave',
      phone: '444-555-6666'
    }
  };

  const employeeData: Record<string, any> = {
    '1': {
      name: 'Seed Employee',
      position: 'Manager',
      department: 'IT',
      email: 'seed@example.com',
      phone: '123-456-7890',
      branchId: '1'
    }
  };

  // Mock branches collection for seeding
  (firestoreRepo.getDocuments as jest.Mock).mockImplementation((collection) => {
    if (collection === 'branches') {
      return Promise.resolve({
        docs: Object.keys(branchData).map(id => ({
          id,
          data: () => branchData[id]
        }))
      });
    }
    if (collection === 'employees') {
      return Promise.resolve({
        docs: Object.keys(employeeData).map(id => ({
          id,
          data: () => employeeData[id]
        }))
      });
    }
    return Promise.resolve({ docs: [] });
  });

  (firestoreRepo.getDocumentById as jest.Mock).mockImplementation((collection, id) => {
    if (collection === 'branches' && branchData[id]) {
      return Promise.resolve({
        id,
        data: () => branchData[id]
      });
    }
    if (collection === 'employees' && employeeData[id]) {
      return Promise.resolve({
        id,
        data: () => employeeData[id]
      });
    }
    return Promise.resolve(null);
  });

  (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('3');
  (firestoreRepo.updateDocument as jest.Mock).mockImplementation((collection, id, data) => {
    if (collection === 'branches' && branchData[id]) {
      branchData[id] = { ...branchData[id], ...data };
    }
    if (collection === 'employees' && employeeData[id]) {
      employeeData[id] = { ...employeeData[id], ...data };
    }
    return Promise.resolve(undefined);
  });
  (firestoreRepo.deleteDocument as jest.Mock).mockResolvedValue(undefined);
});

describe('Branch routes - create', () => {
  it('should create a branch (201)', async () => {
    const res = await request(app).post('/api/v1/branches').send({
      name: 'New Branch',
      address: '100 New St',
      phone: '111-222-3333'
    });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id'); // check inside data
    expect(res.body.data.name).toBe('New Branch');
  });

  it('should return 400 when missing required fields', async () => {
    const res = await request(app).post('/api/v1/branches').send({ name: 'Oops' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Branch routes - read', () => {
  it('should get all branches (200)', async () => {
    const res = await request(app).get('/api/v1/branches');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return 404 for nonexistent branch id', async () => {
    const res = await request(app).get('/api/v1/branches/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should get branch by id (200)', async () => {
    const res = await request(app).get('/api/v1/branches/1');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', '1');
  });
});

describe('Branch routes - update & delete', () => {
  it('should update branch (200)', async () => {
    const res = await request(app).put('/api/v1/branches/1').send({ phone: '999-888-7777' });
    expect(res.status).toBe(200);
    expect(res.body.data.phone).toBe('999-888-7777');
  });

  it('should return 404 updating nonexistent branch', async () => {
    const res = await request(app).put('/api/v1/branches/9999').send({ phone: 'x' });
    expect(res.status).toBe(400);
  });

  it('should delete branch (200)', async () => {
    const res = await request(app).delete('/api/v1/branches/2');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 404 deleting nonexistent branch', async () => {
    const res = await request(app).delete('/api/v1/branches/9999');
    expect(res.status).toBe(404);
  });
});
