import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';
import { CreateBoardButton } from '@/features/boards/components/CreateBoardButton/CreateBoardButton';
import { useBoardsSocketSync } from '@/features/boards/hooks/useBoardsSocketSync.ts';
import { SocketProvider } from '@/context/socket/SocketContext.tsx';
import { MeProvider } from '@/context/me/MeContext.tsx';
import { ThemeToggle } from '@/common/components/ThemeToggle.tsx';

const MainLayoutWrapper = () => {
  return (
    <SocketProvider>
      <MeProvider>
        <MainLayout />
      </MeProvider>
    </SocketProvider>
  );
};

const MainLayout = () => {
  useBoardsSocketSync();

  return (
    <div className="grid h-dvh w-screen grid-rows-[auto_minmax(0,1fr)] overflow-clip">
      <header className="bg-kommy-hair-white-dark/80 flex w-full items-center justify-between px-3 pt-4 pb-3">
        <div />
        <BoardsDropdown />
        <div className='flex gap-2'>
          <ThemeToggle />
          <CreateBoardButton />
        </div>
      </header>
      <Outlet />
      <Background />
    </div>
  );
};

export { MainLayoutWrapper as MainLayout };
