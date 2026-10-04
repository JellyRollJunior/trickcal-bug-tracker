import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '@/common/components/LoadingAnimation.tsx';
import { useAuth } from '@/context/auth/useAuth.ts';

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
      navigate('/', { replace: true });
    } else if (!storedToken) {
      navigate('/auth/login?error=oauth', { replace: true });
    }
  }, [setToken, navigate, storedToken]);

  return <LoadingAnimation />;
};

export { OAuthCallback };
