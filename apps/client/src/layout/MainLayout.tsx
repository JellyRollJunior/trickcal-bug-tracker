import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="bg-kommy-hair-white-dark/80 flex w-full justify-center pt-4 pb-3">
        <BoardsDropdown />
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
      <Background />
    </div>
  );
};

export { MainLayout };
