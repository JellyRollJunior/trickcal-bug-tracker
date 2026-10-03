import type { UserDto } from '@trickcal-bug-tracker/shared';
import { createContext, type ReactNode } from 'react';
import { useMe } from '@/features/auth/hooks/useMe.ts';

type MeContextValue = {
  user: UserDto | undefined;
  isPendingUser: boolean;
};

const MeContext = createContext<MeContextValue | null>(null);

const MeProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isPending: isPendingUser } = useMe();

  return (
    <MeContext.Provider value={{ user, isPendingUser }}>
      {children}
    </MeContext.Provider>
  );
};
export { MeProvider, MeContext };
