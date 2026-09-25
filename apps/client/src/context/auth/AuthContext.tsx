import type { ReactNode } from 'react';
import type { UserDto } from '@trickcal-bug-tracker/shared';
import { createContext, useState } from 'react';
import {
  clearToken,
  getToken,
  setToken as setTokenStorage,
} from '@/lib/TokenStorage.ts';
import { useMe } from '@/features/auth/hooks/useMe.ts';

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: UserDto | undefined;
  isPendingUser: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const { data: user, isPending: isPendingUser } = useMe();

  const setToken = (newToken: string | null) => {
    if (newToken) {
      setTokenStorage(newToken);
    } else {
      clearToken();
    }
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, isPendingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
