import request from 'supertest';
import app from '../src/app';
import { resetEmployees } from '../src/data/employees';
import { resetBranches } from '../src/data/branches';

beforeEach(() => {
  resetBranches();
  resetEmployees();
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
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
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
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return 404 for nonexistent employee id', async () => {
    const res = await request(app).get('/api/v1/employees/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should get employee by id (200)', async () => {
    // pick id 1 from sample data
    const res = await request(app).get('/api/v1/employees/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });
});
