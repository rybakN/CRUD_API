import supertest, { Response } from 'supertest';
import * as dotenv from 'dotenv';
import { User } from '../utils/users.js';
dotenv.config();

const baseURL: string = `http://localhost:` + process.env.SERVER_PORT;

const userBody: Omit<User, 'id'> = {
  username: 'User1',
  age: 18,
  hobbies: ['fishing'],
};

let userID: string;

describe('should CRUD API', () => {
  test('should status 200, get all users ', async () => {
    const response = await supertest(baseURL).get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('should status 201, response.body === userBody', async () => {
    const response: Response = await supertest(baseURL).post('/api/users').send(userBody);
    const body: User = JSON.parse(response.text);
    userID = body.id;

    expect(isUser(body)).toBeTruthy();
    expect(response.statusCode).toBe(201);
  });

  test('should status 200, response.body === userBody', async () => {
    const response: Response = await supertest(baseURL).put(`/api/users/${userID}`).send(userBody);
    const body: User = JSON.parse(response.text);
    let userIdResp = body.id;

    expect(userID === userIdResp).toBeTruthy();
    expect(isUser(body)).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  test('should status 204', async () => {
    const response: Response = await supertest(baseURL).del(`/api/users/${userID}`);

    expect(response.statusCode).toBe(204);
  });

  test('should status 404', async () => {
    const response: Response = await supertest(baseURL).get(`/api/users/${userID}`);

    expect(response.statusCode).toBe(404);
  });
});

const isUser = (user: User): boolean => {
  if (!(user.username === userBody.username)) return false;

  if (!(user.age === userBody.age)) return false;

  user.hobbies.forEach((item: string, index: number) => {
    if (!(item === userBody.hobbies[index])) return false;
  });

  return true;
};
