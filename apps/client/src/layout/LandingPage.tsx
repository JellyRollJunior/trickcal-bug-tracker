import { Link } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { Footer } from '@/layout/Footer.tsx';

const LandingPage = () => {
  return (
    <div className="flex h-full min-h-dvh w-full flex-col gap-2 overflow-y-auto">
      <header className="block-container-primary w-full rounded-none p-1">
        <h1 className="block-primary-title mx-auto w-fit px-8 text-xl font-bold">
          Trickcal Bug Tracker
        </h1>
      </header>

      <main className="h-full flex-1">
        <div className="mt-20 grid w-full grid-cols-3 items-center justify-center gap-20 px-20">
          {/* Intro */}
          <section className="block-container-primary max-w-lg p-1 text-center">
            <h2 className="block-primary-title p-1 text-3xl font-bold">
              Track every idea/bug fix
            </h2>
            <p className="block-primary mt-1 px-8 py-5 text-lg font-semibold">
              The visual task board built for QAs & developers.
              <br />
              Organize bugs, features, and improvements with a simple Kanban
              workflow
            </p>
            <Link
              to="/auth/login"
              className="button-special mx-auto mt-1 block w-fit text-lg"
            >
              Get started
            </Link>
          </section>
          {/* Image Carousel */}
          <section className="block-container-primary col-span-2 h-full w-full">
            Image carousel
          </section>
        </div>
      </main>
      <Footer />
      <Background />
    </div>
  );
};

export { LandingPage };
