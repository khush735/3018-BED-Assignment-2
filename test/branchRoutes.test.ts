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

describe('Branch routes - update & delete', () => {
  it('should update branch (200)', async () => {
    const res = await request(app).put('/api/v1/branches/1').send({ phone: '999-888-7777' });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe('999-888-7777');
  });

  it('should return 404 updating nonexistent branch', async () => {
    const res = await request(app).put('/api/v1/branches/9999').send({ phone: 'x' });
    expect(res.status).toBe(404);
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
