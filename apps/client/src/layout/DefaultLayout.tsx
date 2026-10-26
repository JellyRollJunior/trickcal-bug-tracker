import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/layout/Footer.tsx';
import { Background } from '@/common/components/Background.tsx';
import { Header } from '@/layout/Header.tsx';

const DefaultLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header isNavShown={false} />
      <div className="flex h-full w-full flex-1 flex-col items-center px-3 py-5">
        {children ?? <Outlet />}
      </div>
      <Footer />
      <Background opacity={0.9} />
    </div>
  );
};

export { DefaultLayout };
