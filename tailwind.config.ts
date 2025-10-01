import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
        },
        success: {
          50: '#E8F5E9',
          500: '#4CAF50',
          700: '#388E3C',
        },
        warning: {
          50: '#FFF3E0',
          500: '#FF9800',
          700: '#F57C00',
        },
        danger: {
          50: '#FFEBEE',
          500: '#F44336',
          700: '#D32F2F',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          500: '#9E9E9E',
          900: '#212121',
        },
      },
    },
  },
  plugins: [],
};

export default config;
