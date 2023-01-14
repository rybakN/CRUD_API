import supertest from 'supertest';
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL: string = `http://localhost:` + process.env.SERVER_PORT;

const userBody: { username: string; age: number } = {
  username: 'User2',
  age: 8,
};

describe('should CRUD API 2', () => {
  test('should status 404', async () => {
    const response: supertest.Response = await supertest(baseURL).get('/api/');
    expect(response.statusCode).toBe(404);
  });

  test('should status 400, invalid uuid', async () => {
    const response: supertest.Response = await supertest(baseURL).get('/api/users/');
    expect(response.statusCode).toBe(400);
  });

  test('should status 400, invalid body', async () => {
    const response: supertest.Response = await supertest(baseURL).post('/api/users').send(userBody);

    expect(response.statusCode).toBe(400);
  });

  test('should status 400, invalid body', async () => {
    const response: supertest.Response = await supertest(baseURL).put(`/api/users/`).send(userBody);

    expect(response.statusCode).toBe(400);
  });

  test('should status 400, invalid uuid', async () => {
    const response: supertest.Response = await supertest(baseURL).get(`/api/users/`);

    expect(response.statusCode).toBe(400);
  });
});
