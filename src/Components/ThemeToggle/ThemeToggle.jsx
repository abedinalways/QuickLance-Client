import { use} from 'react';

import { ThemeContext } from '../../Context/ThemeContext';

const ThemeToggle = () => {
  const { dark, toggleTheme } = use(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded  text-black dark:text-white"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
