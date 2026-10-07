import { AUTH_ROUTES_SERVER } from '@trickcal-bug-tracker/shared';
import { env } from '@/config/env.ts';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm.tsx';

const GOOGLE_AUTH_URI = `${env.serverBaseUrl}${AUTH_ROUTES_SERVER.google}`;
const GITHUB_AUTH_URI = `${env.serverBaseUrl}${AUTH_ROUTES_SERVER.github}`;

const Login = () => {
  return (
    <>
      <LoginForm />
      <div className="bg-kommy-hair-white-dark/80 border-kommy-hair-pink-light mt-5 w-full max-w-sm rounded-sm border-2 px-5 py-2">
        <div className="flex w-full flex-col items-center gap-1">
          <div className='flex w-full items-center gap-2'>
            <hr className="h-px w-full flex-1 border-0 bg-gray-300" />
            <p className="mb-1">Sign in with</p>
            <hr className="h-px w-full flex-1 border-0 bg-gray-300" />
          </div>
          <a href={GOOGLE_AUTH_URI}>Google</a>
          <a href={GITHUB_AUTH_URI}>GitHub</a>
        </div>
      </div>
    </>
  );
};

export { Login };
