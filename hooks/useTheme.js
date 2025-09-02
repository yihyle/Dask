import { useState, useEffect } from 'react';
import { isDarkMode, applyTheme, toggleTheme as toggleThemeUtil } from '@/utils/theme';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const darkMode = isDarkMode();
      setIsDark(darkMode);
    } catch (e) {
      console.error('테마 상태 확인 실패:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setIsDark(newTheme);
  };

  const setTheme = (dark) => {
    applyTheme(dark);
    setIsDark(dark);
  };

  return {
    isDark,
    loading,
    toggleTheme,
    setTheme
  };
};