import { useSignupForm } from '@/features/auth/components/SignupForm/useSignupForm.ts';

const SignupForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSignup,
    isPendingSignup,
  } = useSignupForm();

  return (
    <form className="flex flex-col" onSubmit={handleSignup}>
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
        min={1}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
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
        min={1}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
      />

      <div className="my-3 flex gap-3">
        <button
          className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1"
          disabled={isPendingSignup}
        >
          Sign up
        </button>
        <button
          className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1"
          disabled={isPendingSignup}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export { SignupForm };
