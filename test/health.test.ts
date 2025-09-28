import request from 'supertest';
import app from '../src/app';

describe('Health endpoint', () => {
  it('should return server healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Server is healthy');
  });
});
