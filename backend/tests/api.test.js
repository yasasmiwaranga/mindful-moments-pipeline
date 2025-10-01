const request = require('supertest');
const app = require('../src/app');

describe('Mindful Moments API', () => {
  it('GET /api/activities should return list of activities', async () => {
    const response = await request(app).get('/api/activities');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].name).toBe('Guided Breathing');
  });

  it('GET /health should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK');
  });
});