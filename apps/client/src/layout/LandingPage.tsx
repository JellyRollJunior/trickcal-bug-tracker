import kommy from '@/assets/icons/favicon.png';

import { Link } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { Footer } from '@/layout/Footer.tsx';

const LandingPage = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl grid-rows-2 gap-3 px-5 py-3 sm:grid-cols-2 sm:grid-rows-1 sm:py-6">
          <div className="flex items-center justify-center sm:justify-start">
            <img src={kommy} className="size-8" />
            <p className="ml-2 text-xl font-bold">Trickcal Bug Tracker</p>
          </div>
          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <Link className="button-confirm" to={'/auth/login'}>
              Login
            </Link>
            <Link className="button-special" to={'/auth/signup'}>
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl flex-1">
        {/* Hero */}
        <section className="w-full px-3 py-35 sm:py-50">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="text-hero text-center text-4xl font-bold lg:text-7xl">
              Collaborate in Real Time and Launch Cleaner Apps
            </h1>
            <p className="text-secondary max-w-xl text-center font-medium sm:text-lg md:text-xl">
              A real-time Kanban board for developers & QAs. Create a board,
              invite your team, and watch every issue, ticket move, and update
              appear instantly for everyone, no refresh needed.
            </p>
            <div className="flex gap-2.5">
              <Link className="button-special ml-3" to={'/auth/signup'}>
                Get started
              </Link>
              <a className="button-lowkey ml-3 block" href={'#features'}>
                Learn more
              </a>
            </div>
            {/* <div className="mt-3 h-80 w-xl border border-black text-center shadow-2xl">
              I am a placeholder image
            </div> */}
          </div>
        </section>

        {/* Features */}
        <section id="features"></section>
      </main>
      <Footer />
      <Background opacity={0.9} />
    </div>
  );
};

export { LandingPage };
