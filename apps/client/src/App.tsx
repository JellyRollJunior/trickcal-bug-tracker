import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/context/auth/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export { App };
