import kommy from '@/assets/icons/favicon.png';

import { Outlet } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { BoardsDropdown } from '@/features/boards/components/BoardsDropdown.tsx';
import { CreateBoardButton } from '@/features/boards/components/CreateBoardButton/CreateBoardButton.tsx';
import { useBoardsSocketSync } from '@/features/boards/hooks/useBoardsSocketSync.ts';
import { SocketProvider } from '@/context/socket/SocketContext.tsx';
import { MeProvider } from '@/context/me/MeContext.tsx';
import { ThemeToggle } from '@/common/components/ThemeToggle.tsx';
import { LogOutButton } from '@/features/auth/components/LogOutButton.tsx';

const BoardLayoutWrapper = () => {
  return (
    <SocketProvider>
      <MeProvider>
        <BoardLayout />
      </MeProvider>
    </SocketProvider>
  );
};

const BoardLayout = () => {
  useBoardsSocketSync();

  return (
    <div className="boards grid h-dvh w-screen grid-rows-[auto_minmax(0,1fr)]">
      <header className="flex w-full items-center justify-end gap-2 px-2 pt-1.5">
        <img src={kommy} className="size-8" />
        <BoardsDropdown />
        <ThemeToggle />
        <CreateBoardButton />
        <LogOutButton />
      </header>
      <div className="grid min-h-0 grid-cols-1 p-2">
        <Outlet />
      </div>
      <Background opacity={0.9} />
    </div>
  );
};

export { BoardLayoutWrapper as BoardLayout };
