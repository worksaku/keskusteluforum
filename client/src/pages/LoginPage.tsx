import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../context/UserContext';
import { UserContextType } from '../models/user';
import { Redirect } from 'react-router';
import axios, { AxiosResponse } from 'axios';

type InputTargetType = {
  value: string;
};

const LoginPage: React.FC = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
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
          typeof setUser === 'function' && setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!username) setErrors((prev) => [...prev, 'Invalid username']);
      if (!password) setErrors((prev) => [...prev, 'Invalid password']);
    }
  };

  if (user) return <Redirect to="/" />;

  return (
    <>
      <h2 className="text-4xl mb-5">Login</h2>
      <form
        onSubmit={submit}
        className="flex flex-col content-start"
        onChange={() => setErrors([])}
      >
        {errors.map((err) => (
          <p key={err} className="text-red mb-3">
            {err}
          </p>
        ))}
        <input
          name="username"
          value={username}
          onChange={(e: React.ChangeEvent<InputTargetType>) =>
            setUsername(e.target.value)
          }
          className="border mb-3 px-2 py-3 rounded"
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<InputTargetType>) =>
            setPassword(e.target.value)
          }
          className="border mb-3 px-2 py-3 rounded"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-blue-400 px-2 py-3 uppercase text-sm rounded text-white"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
