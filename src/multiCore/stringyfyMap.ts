import { User } from '../utils/users.js';

export const stringifyMap = (users: Map<string, User>): User[] | {} => {
  const _users: User[] = [];
  if (users.size) {
    for (let user of users.values()) {
      _users.push(user);
    }
    return _users;
  } else return {};
};
