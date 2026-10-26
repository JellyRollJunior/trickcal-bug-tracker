import kommy from '@/assets/icons/favicon.png';

import { Link } from 'react-router-dom';

const Header = ({ isNavShown = true }) => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl grid-rows-2 gap-3 px-5 py-3 sm:grid-cols-2 sm:grid-rows-1 sm:py-6">
        <div className="flex items-center justify-center sm:justify-start">
          <img src={kommy} className="size-8" />
          <p className="ml-2 text-xl font-bold">
            <Link to="/">Trickcal Bug Tracker</Link>
          </p>
        </div>
        {isNavShown && (
          <nav className="flex items-center justify-center gap-3 sm:justify-end">
            <Link className="button-confirm" to={'/auth/login'}>
              Login
            </Link>
            <Link className="button-special" to={'/auth/signup'}>
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export { Header };
