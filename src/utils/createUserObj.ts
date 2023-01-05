import { User } from './users.js';
import { v4 as uuidv4 } from 'uuid';

export const createUserObj = (body: string, id?: string): User | null => {
  let _body: any;
  let _id = '';

  try {
    _body = JSON.parse(body);
  } catch {
    return null;
  }

  if (id) {
    _id = id;
  } else {
    _id = uuidv4();
  }

  if (Array.isArray(_body.hobbies)) {
    return new User(_id, _body!.username, _body!.age, _body!.hobbies);
  } else return null;
};
