import type { SubmitEvent } from 'react';
import { useLogin } from '@/features/auth/hooks/useLogin.tsx';
import { useState } from 'react';

const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(
      { username, password },
      {
        onSuccess: (data) => {
          // validate data
          // get token
          console.log(data?.token);
        },
        onError: (error) => {
          console.log(error);
          // set error
        },
      }
    );
  };

  return (
    <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 rounded-sm border-2 px-5">
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label className="mt-3" htmlFor="username">
          Username
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="username"
          type="text"
          name="username"
          min={1}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label className="mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="password"
          type="password"
          name="password"
          min={1}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className="my-3 flex gap-3">
          <button
            className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1"
            disabled={isPending}
          >
            Log in
          </button>
          <button
            className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1"
            disabled={isPending}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export { Login };
