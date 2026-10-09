import type { SubmitEvent } from 'react';
import { useState } from 'react';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useLogin } from '@/features/auth/hooks/useLogin.ts';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
  const { setToken } = useAuth();
  const { mutate: login, isPending, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(
      { username, password },
      {
        onSuccess: (data) => {
          setToken(data.token);
          navigate('/');
        },
        onError: (error) => {
          console.log(error);
          setAuthError(true);
        },
      }
    );
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    authError,
    handleSubmit,
    isPending,
    error,
  };
};

export { useLoginForm };
