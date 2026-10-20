import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import {
  clearToken,
  getToken,
  setToken as setTokenStorage,
} from '@/lib/TokenStorage.ts';

type AuthContextValue = {
  token: string | null;
  setToken: (token: string | null) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const setToken = (newToken: string | null) => {
    if (newToken) {
      setTokenStorage(newToken);
    } else {
      clearToken();
    }
    setTokenState(newToken);
  };

  const logOut = () => {
    setTokenState(null);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
