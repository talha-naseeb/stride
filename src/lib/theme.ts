export const Colors = {
  dark: {
    bg: '#0f1117',
    surface: '#1a1d27',
    surface2: '#22263a',
    border: 'rgba(255,255,255,0.08)',
    text: '#f0f2ff',
    textSecondary: '#7c82a0',
    accent: '#4af0a8',
    accentBlue: '#4f8cff',
    accentRed: '#ff6b6b',
    accentWarn: '#ffc94a',
    card: '#1a1d27',
  },
  light: {
    bg: '#f4f6fc',
    surface: '#ffffff',
    surface2: '#eef1f8',
    border: 'rgba(0,0,0,0.08)',
    text: '#1a1d27',
    textSecondary: '#7c82a0',
    accent: '#22c97a',
    accentBlue: '#3a72e8',
    accentRed: '#e84b4b',
    accentWarn: '#e6a800',
    card: '#ffffff',
  },
};

export const ActivityColors = {
  run: '#4af0a8',
  walk: '#ffc94a',
  cycle: '#4f8cff',
};

export const ActivityIcons = {
  run: 'directions-run',
  walk: 'directions-walk',
  cycle: 'directions-bike',
};

export const ActivityLabels = {
  run: 'Running',
  walk: 'Walking',
  cycle: 'Cycling',
};

export const CalPerKm = {
  run: 65,
  walk: 55,
  cycle: 40,
};

export type ThemeMode = 'dark' | 'light';
export type ActivityType = 'run' | 'walk' | 'cycle';
