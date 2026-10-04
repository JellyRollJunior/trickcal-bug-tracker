// ThemeToggle.tsx
import light_mode from '@/assets/icons/light_mode.svg';
import dark_mode from '@/assets/icons/dark_mode.svg';

import { useTheme } from '@/common/hooks/useTheme.ts';

const ThemeToggle = () => {
  const { getTheme, setTheme } = useTheme();

  function toggle() {
    setTheme(getTheme() ? 'light' : 'dark');
  }

  return (
    <button
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
    >
      <img className="dark:hidden" src={dark_mode} aria-hidden={true} />
      <img className="hidden dark:block" src={light_mode} aria-hidden={true} />
    </button>
  );
};

export { ThemeToggle };
