import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth/AuthContext.tsx';
import { SocketProvider } from './context/socket/SocketContext.tsx';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Toaster />
        <Outlet />
      </SocketProvider>
    </AuthProvider>
  );
}

export { App };
