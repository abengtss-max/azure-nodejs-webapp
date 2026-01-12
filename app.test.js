const request = require('supertest');
const app = require('./app');

describe('API Endpoints', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Welcome');
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/info should return system info', async () => {
    const response = await request(app).get('/api/info');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nodeVersion');
  });

  test('GET /invalid-route should return 404', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});