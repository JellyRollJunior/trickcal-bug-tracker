import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';

const MainLayout = () => {
  return (
    <div className="h-dvh w-screen grid grid-rows-[auto_minmax(0,1fr)]">
      <header className="bg-kommy-hair-white-dark/80 flex w-full justify-center pt-4 pb-3">
        <BoardsDropdown />
      </header>
      <Outlet />
      <Background />
    </div>
  );
};

export { MainLayout };
