import { useState, type SubmitEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useLoginDemo } from '@/features/auth/hooks/useLoginDemo.ts';

const useLogin = () => {
  const { setToken } = useAuth();
  const { mutate: login, isPending: isPendingLoginDemo } = useLoginDemo();
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const redirectError = params.get('error');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
    login(undefined, {
      onSuccess: (data) => {
        setToken(data.token);
        navigate('/boards');
      },
      onError: (error) => {
        console.log(error);
        setAuthError(true);
      },
    });
  };

  return {
    authError,
    isPendingLoginDemo,
    handleSubmit,
    redirectError,
    setParams
  };
};

export { useLogin };
