import usersStorage from "./user.storage";
import User from "./user.model";

let { users } = usersStorage;

const getAll = async (): Promise<Array<User>> => users;

const getUser = async (id: string): Promise<User | undefined> => {
  const user = users.find((u) => u.id === id);
  return user;
};

const saveUser = async (user: User): Promise<User> => {
  users.push(user);
  return user;
};

const updateUser = async (user: User): Promise<User> => {
  const userIndex = users.findIndex((u) => u.id === user.id);
  if (userIndex < 0) {
    throw new Error();
  }
  users[userIndex] = user;
  return user;
};

const removeUser = async (id: string): Promise<void> => {
  users = users.filter((u) => u.id !== id);
};

export { getAll, getUser, updateUser, saveUser, removeUser };
