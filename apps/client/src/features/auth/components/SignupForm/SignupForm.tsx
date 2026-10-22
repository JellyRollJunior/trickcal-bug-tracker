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
    isPasswordRegexError,
    isConfirmPasswordError,
    handleSignup,
    isPendingSignup,
  } = useSignupForm();

  return (
    <div className="w-full max-w-sm pt-20 md:pt-40">
      <form className="flex flex-col" onSubmit={handleSignup}>
        <h2 className="text-center text-xl">
          Get Started with Trickcal Bug Tracker
        </h2>

        <label className="mt-6" htmlFor="name">
          Display name
        </label>
        <input
          className="input-dark mt-1 h-8"
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
          className="input-dark mt-1 h-8"
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
        {isPasswordRegexError && (
          <span className="text-sm text-red-400">
            Use upper and lowercase letters, a number, and a symbol (!@#$%^&*).
            No '&lt;' or '&gt;'.
          </span>
        )}
        <input
          className="input-dark mt-1 h-8"
          id="password"
          type="password"
          name="password"
          minLength={8}
          maxLength={16}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          required
        />
        <label className="mt-3" htmlFor="confirmPassword">
          Confirm password
        </label>
        {isConfirmPasswordError && (
          <span className="text-sm text-red-400">Passwords must match</span>
        )}
        <input
          className="input-dark mt-1 h-8"
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
        <button className="button-confirm mt-5" disabled={isPendingSignup}>
          Sign up
        </button>
        <Link className="button-lowkey mt-2.5" to={`/auth/login`}>
          Return to Login
        </Link>
      </form>
    </div>
  );
};

export { SignupForm };
