const Login = () => {
  return (
    <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 rounded-sm border-2 px-5">
      <form className="flex flex-col">
        <label className="mt-3" htmlFor="username">
          Username
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          type="text"
          name="username"
          id="username"
        />

        <label className="mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="border-sand-beige mt-1 h-8 w-full rounded-md border-2 pr-1 pl-2"
          type="password"
          name="password"
          id="password"
        />

        <div className="my-3 flex gap-3">
          <button className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1">
            Log in
          </button>
          <button className="bg-sand-beige-light text-sand-beige-dark border-sand-beige-dark rounded-md border-2 px-5 py-1">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export { Login };
