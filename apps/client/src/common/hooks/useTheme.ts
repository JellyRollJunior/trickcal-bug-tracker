import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const getIsSystemThemeDark = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getIsCurrentThemeDark = () => {
    return document.documentElement.classList.contains('dark');
}

const applyTheme = (theme: Theme) => {
    const isDark =
        theme === 'dark' || (theme === 'system' && getIsSystemThemeDark());
    // toggle 'dark' on <html>
    document.documentElement.classList.toggle('dark', isDark);
};

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem('theme') as Theme) ?? 'system'
    );

    useEffect(() => {
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    }, [theme]);

    return { getIsCurrentThemeDark, setTheme };
};

export { useTheme };
