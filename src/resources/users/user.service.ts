import * as usersRepo from './user.memory.repository';
import User from './user.model';

const getAll = (): Promise<Array<User>> => usersRepo.getAll();

export { getAll };
