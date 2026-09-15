import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <header className="w-full pt-4 pb-3 bg-kommy-hair-white-dark/80">
        <h1 className="text-center">Trickcal Bug Tracker</h1>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <Background />
    </div>
  );
};

export { MainLayout };
