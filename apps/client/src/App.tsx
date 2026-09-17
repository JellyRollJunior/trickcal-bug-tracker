import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Outlet />
    </AuthProvider>
  );
}

export { App };
