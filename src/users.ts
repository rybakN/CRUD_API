export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string> | null;
}

export const Users: Map<string, User> = new Map();

export const getAllUsers = (): User[] => {
  const allUsers: User[] = [];

  for (let key of Users.keys()) {
    let user: User | undefined = Users.get(key);
    if (user) allUsers.push(user);
  }

  return allUsers;
};
