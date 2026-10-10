import kommy from '@/../public/favicon.png'

import { Outlet } from 'react-router-dom';
import { Footer } from '@/layout/Footer.tsx';
import { Background } from '@/common/components/Background.tsx';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <header className="fixed top-0 left-0 flex w-full px-5 py-3 backdrop-blur-xl">
        <img src={kommy} className='size-8 md:ml-6 lg:ml-12' />
        <p className="text-xl font-bold ml-2 mt-0.5">
          Trickcal Bug Tracker
        </p>
      </header>
      <div className="flex h-full w-full flex-1 flex-col items-center px-3 py-5">
        <Outlet />
      </div>
      <Footer />
      <Background opacity={0.9} />
    </div>
  );
};

export { AuthLayout };
