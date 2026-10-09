import { Link } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { Footer } from '@/layout/Footer.tsx';

const LandingPage = () => {
  return (
    <div className="text-ivory flex min-h-dvh w-full flex-col">
      <nav className="fixed top-0 left-0 flex w-full px-5 py-3 backdrop-blur-xl">
        <p className="text-xl font-bold md:ml-6 lg:ml-12">
          Trickcal Bug Tracker
        </p>
        <Link className="button-confirm ml-auto block" to={'/auth/login'}>
          Login
        </Link>
        <Link className="button-special ml-3" to={'/auth/signup'}>
          Get started
        </Link>
      </nav>
      <main className="flex-1">
        {/* Hero */}
        <section className="w-full py-50">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="text-hero text-center font-bold text-4xl lg:text-7xl">
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
            <div className="mt-3 h-80 w-xl border border-black text-center shadow-2xl">
              I am a placeholder image
            </div>
          </div>
        </section>
        {/* Features */}
        <section id="features">I am feature list!</section>
      </main>
      <Footer />
      <Background opacity={0.9} />
    </div>
  );
};

export { LandingPage };
