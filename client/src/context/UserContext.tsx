import { createContext } from 'react';
import { UserContextType } from '../models/user';

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
