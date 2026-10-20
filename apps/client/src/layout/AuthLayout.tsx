import { AuthenticationError } from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useMe } from '@/features/auth/hooks/useMe.ts';
import { resolveError } from '@/lib/resolveError.ts';
import { Spinner } from '@/common/components/Spinner.tsx';

const AuthSessionCheck = () => {
  const { logOut } = useAuth();
  const { data: me, error, isPending } = useMe();

  useEffect(() => {
    if (!error) return;
    try {
      resolveError(error);
    } catch (err) {
      if (err instanceof AuthenticationError) logOut();
    }
  }, [error, logOut]);

  if (isPending)
    return (
      <div className="py-25 md:py-50">
        <Spinner className="size-10 border-2" />
      </div>
    );
  if (me) return <Navigate to="/boards" replace />;

  return <Outlet />;
};

const AuthLayout = () => {
  const { token } = useAuth();

  return token ? <AuthSessionCheck /> : <Outlet />;
};

export { AuthLayout };
