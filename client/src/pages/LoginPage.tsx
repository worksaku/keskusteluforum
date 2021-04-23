import React, { ChangeEvent, useContext, useState } from 'react';

import UserContext from '../context/UserContext';
import { Redirect } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Button, TextField } from '../components';

const LoginPage: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Array<string>>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      axios
        .post('/user/login', {
          username,
          password,
        })
        .then((res: AxiosResponse) => {
          if (typeof setUser === 'function') {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!username) setErrors((prev) => [...prev, 'Invalid username']);
      if (!password) setErrors((prev) => [...prev, 'Invalid password']);
    }
  };

  const resetErrors = () => setErrors([]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  if (user) return <Redirect to="/" />;

  return (
    <>
      <h2 className="text-4xl mb-5">Login</h2>
      <form
        onSubmit={submit}
        className="flex flex-col content-start"
        onChange={resetErrors}
      >
        {errors.map((err) => (
          <p key={err} className="text-red mb-3">
            {err}
          </p>
        ))}
        <TextField
          name="username"
          value={username}
          onChange={handleUsernameChange}
          classes="mb-3"
          placeholder="Username"
        />
        <TextField
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          classes="mb-3"
          placeholder="Password"
        />
        <Button type="submit" text="Login" />
      </form>
    </>
  );
};

export default LoginPage;
