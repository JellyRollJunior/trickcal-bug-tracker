import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@trickcal-bug-tracker/shared';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/context/auth/useAuth.ts';

const SERVER_URL = import.meta.env.VITE_SERVER_BASE_URL;

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type SocketContextValue = {
  socket: AppSocket | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextValue | null>(null);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<AppSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const newSocket: AppSocket = io(SERVER_URL, {
      auth: { token },
      withCredentials: true,
    });

    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export type { AppSocket };
export { SocketProvider, SocketContext };
