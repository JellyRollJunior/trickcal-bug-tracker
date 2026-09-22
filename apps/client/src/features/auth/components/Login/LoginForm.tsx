import { useLoginForm } from '@/features/auth/components/Login/useLoginForm.tsx';

const LoginForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    isPending,
  } = useLoginForm();

  return (
    <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 rounded-sm border-2 px-5">
      <form className="flex flex-col" onSubmit={handleSubmit}>
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

export { LoginForm };
