import supertest from 'supertest';
import * as dotenv from 'dotenv';
import { User } from '../utils/users.js';
dotenv.config();

const baseURL: string = `http://localhost:` + process.env.SERVER_PORT;

const userBody: Omit<User, 'id'> = {
  username: 'User1',
  age: 18,
  hobbies: ['fishing'],
};

describe('should CRUD API 3', () => {
  test("should status 404, user with uuid doesn't exist", async () => {
    const response: supertest.Response = await supertest(baseURL).get('/api/users/123321');
    expect(response.statusCode).toBe(404);
  });

  test("should status 404, user with uuid doesn't exist", async () => {
    const response: supertest.Response = await supertest(baseURL).put('/api/users/123321').send(userBody);

    expect(response.statusCode).toBe(404);
  });

  test('should status 400, invalid uuid', async () => {
    const response: supertest.Response = await supertest(baseURL).del(`/api/users/`);

    expect(response.statusCode).toBe(400);
  });

  test('should status 201', async () => {
    const response: supertest.Response = await supertest(baseURL).post('/api/users').send(userBody);

    expect(response.statusCode).toBe(201);
  });

  test('should status 201', async () => {
    const response: supertest.Response = await supertest(baseURL).post('/api/users').send(userBody);

    expect(response.statusCode).toBe(201);
  });

  test('should status 200, count users === 2', async () => {
    const response: supertest.Response = await supertest(baseURL).get('/api/users');
    const body: User[] = JSON.parse(response.text);
    expect(body.length > 0).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});
