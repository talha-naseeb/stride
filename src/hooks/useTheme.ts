import { useStore } from '../store';
import { Colors } from '../lib/theme';

export const useTheme = () => {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const colors = Colors[theme];
  return { theme, colors, toggleTheme, isDark: theme === 'dark' };
};
