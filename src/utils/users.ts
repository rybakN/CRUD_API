export class User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];

  constructor(id: string, username: string, age: number, hobbies: string[]) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
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
