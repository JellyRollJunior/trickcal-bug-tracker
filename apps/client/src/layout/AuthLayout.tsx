import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useMe } from '@/features/auth/hooks/useMe.ts';
import { resolveError } from '@/lib/resolveError.ts';

const AuthLayoutContainer = () => {
  const { token } = useAuth();

  return token ? <AuthLayout /> : <Outlet />;
};

const AuthLayout = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const { data: me, error } = useMe();

  useEffect(() => {
    if (me) {
      navigate('/boards', { replace: true });
    }

    try {
      if (error) resolveError(error);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        logOut();
      }
    }
  }, [me, error, logOut, navigate]);

  return <Outlet />;
};

export { AuthLayoutContainer as AuthLayout };
