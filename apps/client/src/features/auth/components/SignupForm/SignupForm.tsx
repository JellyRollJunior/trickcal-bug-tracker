import { passwordRegex } from '@trickcal-bug-tracker/shared';
import { useSignupForm } from '@/features/auth/components/SignupForm/useSignupForm.ts';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
    handleSignup,
    isPendingSignup,
  } = useSignupForm();

  return (
    <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 rounded-sm border-2 px-5">
      <form className="flex flex-col" onSubmit={handleSignup}>
        <label className="mt-3" htmlFor="name">
          Display name
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="username"
          type="text"
          name="username"
          minLength={1}
          maxLength={16}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          required
        />

        <label className="mt-3" htmlFor="username">
          Username
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="username"
          type="text"
          name="username"
          minLength={8}
          maxLength={16}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          required
        />

        <label className="mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="password"
          type="password"
          name="password"
          minLength={8}
          maxLength={16}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          pattern={passwordRegex.source}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          required
        />
        <label className="mt-3" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          minLength={8}
          maxLength={16}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          required
        />

        {/* Control Buttons */}
        <div className="my-3 flex justify-around gap-3">
          <button
            className="button-primary px-3 py-1"
            disabled={isPendingSignup}
          >
            Sign up
          </button>
          <Link className="button-primary block px-3 py-1" to={`/auth/login`}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export { SignupForm };
