import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField } from '../components';

const RegisterPage: React.FC = () => {
  const [created, setCreated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      axios.put('/user', { username, password }).then((res: AxiosResponse) => {
        if (res?.data) {
          setCreated(true);
        }
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

  if (created) return <p>Account has been created, log in to access</p>;
  return (
    <div>
      <h2 className="text-4xl mb-5">Register to Keskustelufoorumi</h2>
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
        <Button type="submit" text="Register" />
      </form>
    </div>
  );
};

export default RegisterPage;
