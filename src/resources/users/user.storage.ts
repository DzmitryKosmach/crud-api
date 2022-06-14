import User from './user.model';

const usersStorage = {users: [
  new User({
    name: 'Ivan',
    login: 'loginIvan',
    password: 'T37t_P@58w0rd',
  }),
  new User({
    name: 'Ivan2',
    login: 'loginIvan2',
    password: 'T34t_P@59w0rd',
  }),
]};

export default usersStorage;