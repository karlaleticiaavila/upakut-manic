import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

const users: User[] = [];

export function getAllUsers(): User[] {
  return users;
}


export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function createUser(username: string, email: string, passwordHash: string): User {
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    passwordHash,
  };

  users.push(newUser);
  return newUser;
}