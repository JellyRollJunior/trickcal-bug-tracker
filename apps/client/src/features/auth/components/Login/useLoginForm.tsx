import type { SubmitEvent } from 'react';
import { useState } from 'react';
import { useAuth } from '@/context/auth/useAuth.ts';
import { useLogin } from '@/features/auth/hooks/useLogin.ts';

const useLoginForm = () => {
  const authContext = useAuth();
  const { mutate: login, isPending, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(
      { username, password },
      {
        onSuccess: (data) => {
          authContext.setToken(data.token);
        },
        onError: (error) => {
          console.log(error);
          // set error
        },
      }
    );
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    isPending,
    error,
  };
};

export { useLoginForm };
