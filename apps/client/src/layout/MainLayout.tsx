import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Toaster />
      <header className="bg-kommy-hair-white-dark/80 flex w-full justify-center pt-4 pb-3">
        <BoardsDropdown />
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <Background />
    </div>
  );
};

export { MainLayout };
