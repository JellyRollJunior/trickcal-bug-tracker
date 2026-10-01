import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';
import { CreateBoardButton } from '@/features/boards/components/CreateBoardButton/CreateBoardButton';
import { useBoardsSocketSync } from '@/features/boards/hooks/useBoardsSocketSync.ts';

const MainLayout = () => {
  useBoardsSocketSync();
  
  return (
    <div className="h-dvh w-screen grid grid-rows-[auto_minmax(0,1fr)] overflow-clip">
      <header className="bg-kommy-hair-white-dark/80 flex justify-between items-center px-3 w-full  pt-4 pb-3">
        <div />
        <BoardsDropdown />
        <CreateBoardButton />
      </header>
      <Outlet />
      <Background />
    </div>
  );
};

export { MainLayout };
