import * as usersRepo from './user.memory.repository';
import User from './user.model';

const getAll = (): Promise<Array<User>> => usersRepo.getAll();

const getById = (id: string): Promise<User|undefined> => usersRepo.getUser(id);

const update = (user: User): Promise<User> => usersRepo.updateUser(user);

const save = (user: User): Promise<User> => usersRepo.saveUser(user);

const remove = (id: string): Promise<void> => usersRepo.removeUser(id);

export { getAll, getById, save, update, remove };
