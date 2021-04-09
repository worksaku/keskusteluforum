import { createContext } from 'react';
import { UserContextType } from '../models/user';

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: null,
});

export default UserContext;
