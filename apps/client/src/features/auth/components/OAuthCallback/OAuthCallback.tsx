import kommyShocked from '@/assets/icons/kommy-shocked.png';

import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth/useAuth.ts';
import { Spinner } from '@/common/components/Spinner.tsx';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setToken, token: storedToken } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('token');

    if (token) {
      setToken(token);
      navigate('/boards', { replace: true });
    } else if (!storedToken) {
      toast.error('Unable to login with OAuth');
      navigate(`/auth/login`, { replace: true });
    }
  }, [setToken, navigate, storedToken]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-50">
      <img src={kommyShocked} className="size-32" />
      <div className="flex items-center gap-3">
        <Spinner />
        Authorizing...
      </div>
      <Link className="button-special" to={'/auth/login'}>
        Taking a while? Return to login
      </Link>
    </div>
  );
};

export { OAuthCallback };
