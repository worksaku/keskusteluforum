import axios from 'axios';
import { FormEvent, useState } from 'react';

type InputTargetType = {
  value: string;
};

const RegisterPage: React.FC = () => {
  const [created, setCreated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      axios.post('/user', { username, password }).then((res) => {
        if (res?.data) {
          setCreated(true);
        }
      });
    } else {
      if (!username) setErrors((prev) => [...prev, 'Invalid username']);
      if (!password) setErrors((prev) => [...prev, 'Invalid password']);
    }
  };
  if (created) return <p>Account has been created, log in to access</p>;
  return (
    <div>
      <h2 className="text-4xl mb-5">Register to Keskustelufoorumi</h2>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
