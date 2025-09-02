export const isDarkMode = () => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ? stored === "dark" : prefersDark;
  } catch (e) {
    return false;
  }
};

export const applyTheme = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const toggleTheme = () => {
  const currentTheme = isDarkMode();
  const newTheme = !currentTheme;
  applyTheme(newTheme);
  return newTheme;
};