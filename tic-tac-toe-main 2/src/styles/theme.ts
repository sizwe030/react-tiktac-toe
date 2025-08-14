export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    shadow: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    surface: string;
  };
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#1F2937',
    textSecondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
    secondary: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    surface: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#60A5FA',
    secondary: '#A78BFA',
    accent: '#FBBF24',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    surface: 'rgba(31, 41, 55, 0.9)',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
    secondary: 'linear-gradient(135deg, #A78BFA, #F472B6)',
    surface: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))',
  },
};

export const neonTheme: Theme = {
  name: 'neon',
  colors: {
    primary: '#00FFFF',
    secondary: '#FF00FF',
    accent: '#FFFF00',
    background: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #003366 100%)',
    surface: 'rgba(0, 0, 0, 0.8)',
    text: '#00FFFF',
    textSecondary: '#FF00FF',
    success: '#00FF00',
    warning: '#FFFF00',
    error: '#FF0040',
    border: 'rgba(0, 255, 255, 0.3)',
    shadow: 'rgba(0, 255, 255, 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00FFFF, #FF00FF)',
    secondary: 'linear-gradient(135deg, #FF00FF, #FFFF00)',
    surface: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(26, 0, 51, 0.8))',
  },
};

export const themes = { light: lightTheme, dark: darkTheme, neon: neonTheme };