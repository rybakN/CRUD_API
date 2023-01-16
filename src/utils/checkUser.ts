import { User } from './users.js';

export const checkUser = (user: User | null): boolean => {
  if (!user) return false;
  return !(!user.hobbies || !user.age || !user.username);
};
