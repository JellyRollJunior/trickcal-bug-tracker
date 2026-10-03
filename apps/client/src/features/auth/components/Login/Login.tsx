import { AUTH_ROUTES_SERVER } from '@trickcal-bug-tracker/shared';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm.tsx';

const SERVER_BASE_URI = import.meta.env.BASE_URL;
const GOOGLE_AUTH_URI = `${SERVER_BASE_URI}${AUTH_ROUTES_SERVER.google}`;
const GITHUB_AUTH_URI = `${SERVER_BASE_URI}${AUTH_ROUTES_SERVER.github}`;

const Login = () => {
  return (
    <>
      <LoginForm />
      <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 w-full max-w-sm rounded-sm border-2 px-5">
        <a href={GOOGLE_AUTH_URI} />
        <a href={GITHUB_AUTH_URI} />
      </div>
    </>
  );
};

export { Login };
