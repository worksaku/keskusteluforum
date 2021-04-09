import { useContext, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

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
      <Typography variant="h2" component="h2">
        Login
      </Typography>
      <form onSubmit={submit}>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginPage;
