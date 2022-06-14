import usersStorage from './user.storage';
import User from './user.model';

let {users} = usersStorage;

const getAll = async (): Promise<Array<User>> => users;

export { getAll};
