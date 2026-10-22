import kommy from '@/assets/icons/favicon.png';
import boards_dark from '@/assets/images/boards-dark.png';

import { Link } from 'react-router-dom';
import { Background } from '@/common/components/Background.tsx';
import { Footer } from '@/layout/Footer.tsx';

const features = [
  {
    title: 'Visual Kanban Board',
    description:
      'Organize work into your own sections and drag tickets between them with live reordering.',
  },
  {
    title: 'Instant, Shared Updates',
    description:
      'Every create, edit, delete, or move syncs to everyone the moment it happens. No refreshing needed.',
  },
  {
    title: 'Collaborate with Live Presence',
    description:
      "See who's viewing a board right now, so you always know who's in sync with you.",
  },
  {
    title: 'Built for Teams',
    description:
      'Add collaborators and assign tickets to teammates so ownership is always clear.',
  },
];

const LandingPage = () => {
  return (
    <div className="dark flex min-h-dvh w-full flex-col">
      {/* Header */}
      <nav className="fixed top-0 left-0 z-10 w-full backdrop-blur-xl">
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
      <main className="mx-auto max-w-7xl flex-1 p-6">
        {/* Hero */}
        <section className="w-full pt-35 sm:pt-50">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="text-hero text-center text-4xl font-bold lg:text-7xl">
              Collaborate in Real Time and Launch Cleaner Apps
            </h1>
            <p className="text-secondary max-w-xl text-center font-medium sm:text-lg md:text-xl">
              A Kanban board where your whole team stays in sync. Every change
              shows up instantly for everyone.
            </p>
            <div className="flex gap-2.5">
              <Link className="button-special ml-3" to={'/auth/signup'}>
                Get started
              </Link>
              <a className="button-lowkey ml-3 block" href={'#features'}>
                Learn more
              </a>
            </div>
            <div className="mx-2 mt-8 h-fit max-w-4xl w-full shadow-2xl">
              <img src={boards_dark} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full pt-35 sm:pt-40">
          <div className="flex w-full flex-col items-center gap-6">
            <h2 className="text-primary text-center text-2xl font-bold sm:text-4xl">
              Everything you need to stay in sync
            </h2>
            <p className="text-secondary max-w-xl text-center font-medium sm:text-lg md:text-xl">
              Simple, powerful tools for developers who ship
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, description }) => (
                <li key={title} className="block-primary p-8">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-secondary mt-2">{description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
      <Background opacity={0.9} />
    </div>
  );
};

export { LandingPage };
