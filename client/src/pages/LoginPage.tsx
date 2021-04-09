import { useContext, useState } from 'react';

import UserContext from '../context/UserContext';
import { UserContextType } from '../models/user';
import { Redirect } from 'react-router';
import axios, { AxiosResponse } from 'axios';

const LoginPage: React.FC = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      axios
        .post('/user/login', {
          username,
          password,
        })
        .then((res: AxiosResponse) => {
          typeof setUser === 'function' && setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('lets not go');
    }
  };

  if (user) return <Redirect to="/" />;

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
