import { User, Users } from '../utils/users.js';
import { stringifyMap } from './stringyfyMap.js';

export const updateBD = (msg: string): void => {
  const _Users: User[] = JSON.parse(msg);
  if (_Users.length) {
    Users.clear();
    _Users.forEach((user: User) => {
      Users.set(user.id, user);
    });
  }
};

export const getWorkerBD = (): void => {
  process.send!(JSON.stringify(stringifyMap(Users)));
};
