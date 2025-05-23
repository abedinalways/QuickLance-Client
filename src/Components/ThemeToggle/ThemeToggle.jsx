import { useEffect, useState } from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
  }
  return 'light';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <section className="md:relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden z-110">
      <button
        onClick={toggleTheme}
        aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="absolute top-3 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === 'dark' ? (
          <span className="text-yellow-300 text-xl">🌞</span>
        ) : (
          <span className="text-gray-700 text-xl">🌙</span>
        )}
      </button>
    </section>
  );
};

export default ThemeToggle;
