import request from 'supertest';
import app from '../src/app';
import { resetBranches } from '../src/data/branches';
import { resetEmployees } from '../src/data/employees';

beforeEach(() => {
  resetBranches();
  resetEmployees();
});

describe('Branch routes - create', () => {
  it('should create a branch (201)', async () => {
    const res = await request(app).post('/api/v1/branches').send({
      name: 'New Branch',
      address: '100 New St',
      phone: '111-222-3333'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 when missing required fields', async () => {
    const res = await request(app).post('/api/v1/branches').send({ name: 'Oops' });
    expect(res.status).toBe(400);
  });
});

describe('Branch routes - read', () => {
  it('should get all branches (200)', async () => {
    const res = await request(app).get('/api/v1/branches');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return 404 for nonexistent branch id', async () => {
    const res = await request(app).get('/api/v1/branches/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should get branch by id (200)', async () => {
    const res = await request(app).get('/api/v1/branches/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });
});
