import { Outlet } from 'react-router-dom';
import { Footer } from '@/layout/Footer.tsx';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { AuthLayout };
