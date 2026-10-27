import google_oauth from '@/assets/icons/google_oauth.svg';
import github_oauth from '@/assets/icons/github_oauth.svg';
import kommy from '@/assets/icons/favicon.png';

import {
  AUTH_ROUTES_SERVER,
  ERROR_REDIRECT_CODES,
} from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { env } from '@/config/env.ts';
import { useLogin } from '@/features/auth/components/Login/useLogin.ts';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm.tsx';
import { SpinnerButton } from '@/common/components/Spinnerbutton.tsx';

const GOOGLE_AUTH_URI = `${env.serverBaseUrl}${AUTH_ROUTES_SERVER.google}`;
const GITHUB_AUTH_URI = `${env.serverBaseUrl}${AUTH_ROUTES_SERVER.github}`;

const oauthErrorMessages: Record<string, string> = {
  [ERROR_REDIRECT_CODES.oauthGithub]: 'Unable to login with Github',
  [ERROR_REDIRECT_CODES.oauthGoogle]: 'Unable to login with Google',
};

const Login = () => {
  const {
    authError,
    isPendingLoginDemo,
    handleSubmit,
    redirectError,
    setParams,
  } = useLogin();

  useEffect(() => {
    if (!redirectError) return;
    const message = Object.hasOwn(oauthErrorMessages, redirectError)
      ? oauthErrorMessages[redirectError]
      : 'Login failed. Please try again.';
    toast.error(message, { id: redirectError });

    setParams(
      (prev) => {
        prev.delete('error');
        return prev;
      },
      { replace: true }
    );
  }, [redirectError, setParams]);

  return (
    <>
      <div className="flex w-full items-center justify-center pt-20 md:pt-45">
        <LoginForm />
      </div>
      <section className="mt-6 flex w-full max-w-sm flex-col items-center">
        <div className="flex w-full items-center gap-2">
          <hr className="h-px w-full flex-1 border-0 bg-gray-300" />
          <p className="mb-1">or sign in with</p>
          <hr className="h-px w-full flex-1 border-0 bg-gray-300" />
        </div>
        <div className="mt-4 flex w-full flex-col gap-2">
          <a
            className="button-lowkey flex items-center justify-center text-center"
            href={GOOGLE_AUTH_URI}
          >
            <img src={google_oauth} className="" aria-hidden />
            Google
          </a>
          <a
            className="button-lowkey flex items-center justify-center gap-0.5 py-1 text-center"
            href={GITHUB_AUTH_URI}
          >
            <img src={github_oauth} className="" aria-hidden />
            GitHub
          </a>
          <form onSubmit={handleSubmit}>
            <SpinnerButton
              className="button-lowkey flex w-full items-center justify-center gap-1.5 py-1.5 text-center"
              title="Continue as demo user"
              isDisabled={isPendingLoginDemo}
              isLoading={isPendingLoginDemo}
            >
              <img src={kommy} className="size-6" aria-hidden />
            </SpinnerButton>
          </form>
        </div>
      </section>
    </>
  );
};

export { Login };
