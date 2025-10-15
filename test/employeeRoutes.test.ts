import request from 'supertest';
import app from '../src/app';
import * as firestoreRepo from '../src/api/v1/repositories/firestoreRepository';

jest.mock('../src/api/v1/repositories/firestoreRepository');

beforeEach(async () => {
  jest.clearAllMocks();

  // Mock data storage
  const branchData: Record<string, any> = {
    '1': {
      name: 'Seed Branch',
      address: '100 Main St',
      phone: '111-222-3333'
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

  (firestoreRepo.createDocument as jest.Mock).mockResolvedValue('2');
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

describe('Employee routes - create', () => {
  it('should create a new employee (201)', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .send({
        name: 'Test User',
        position: 'Teller',
        department: 'Operations',
        email: 'test.user@example.com',
        phone: '123-456-7890',
        branchId: 1
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id'); // inside data
    expect(res.body.data.name).toBe('Test User');
  });

  it('should return 400 when required fields missing', async () => {
    const res = await request(app)
      .post('/api/v1/employees')
      .send({ position: 'Teller' }); // missing many fields
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Employee routes - read', () => {
  it('should get all employees (200)', async () => {
    const res = await request(app).get('/api/v1/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should return 404 for nonexistent employee id', async () => {
    const res = await request(app).get('/api/v1/employees/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should get employee by id (200)', async () => {
    const res = await request(app).get('/api/v1/employees/1');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id', '1');
  });
});

describe('Employee routes - update & delete', () => {
  it('should update an employee (200)', async () => {
    const res = await request(app)
      .put('/api/v1/employees/1')
      .send({ position: 'Senior Manager' });
    expect(res.status).toBe(200);
    expect(res.body.data.position).toBe('Senior Manager');
  });

  it('should return 404 updating nonexistent employee', async () => {
    const res = await request(app).put('/api/v1/employees/9999').send({ position: 'X' });
    expect(res.status).toBe(404);
  });

  it('should delete an employee (200)', async () => {
    const res = await request(app).delete('/api/v1/employees/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 404 deleting nonexistent employee', async () => {
    const res = await request(app).delete('/api/v1/employees/9999');
    expect(res.status).toBe(404);
  });
});

describe('Employee logical endpoints', () => {
  it('should get employees for a branch (200)', async () => {
    const res = await request(app).get('/api/v1/branches/1/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('should return 400 when branchId missing or invalid for branch employees', async () => {
    const res = await request(app).get('/api/v1/branches/0/employees');
    expect([400, 404]).toContain(res.status); // tolerate 400 or 404
  });

  it('should get employees by department (200)', async () => {
    const res = await request(app).get('/api/v1/employees/department/IT');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('should return 400 when department param missing', async () => {
    const res = await request(app).get('/api/v1/employees/department/');
    expect([400, 404]).toContain(res.status);
  });
});
