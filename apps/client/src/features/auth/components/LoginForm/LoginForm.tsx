import { Link } from 'react-router-dom';
import { useLoginForm } from '@/features/auth/components/LoginForm/useLoginForm';

const LoginForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    authError,
    handleSubmit,
    isPending,
  } = useLoginForm();

  return (
    <div className="w-full max-w-sm">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h2 className='text-center text-xl'>Log In to Trickcal Bug Tracker</h2>
        <label className="mt-6" htmlFor="username">
          Username
        </label>
        <input
          className="input-dark mt-1 h-8"
          id="username"
          type="text"
          name="username"
          minLength={1}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <label className="mt-3" htmlFor="password">
          Password
        </label>
        {authError && (
          <span className="text-sm text-red-400">
            The password you entered is incorrect.
          </span>
        )}
        <input
          className="input-dark mt-1 h-8"
          id="password"
          type="password"
          name="password"
          minLength={1}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <div className="mt-5 flex text-center flex-col w-full justify-around gap-2.5">
          <button className="button-confirm" disabled={isPending}>
            Log in
          </button>
          <Link className="button-special" to={`/auth/signup`}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };
