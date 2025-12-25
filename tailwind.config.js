/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nike-inspired theme
        background: {
          DEFAULT: '#1a1a1a', // dark grey base
          secondary: '#404040', // grey secondary
        },
        foreground: {
          DEFAULT: '#ffffff', // white
          muted: '#737373', // grey text
        },
        primary: {
          DEFAULT: '#60a5fa', // light blue accent
          hover: '#3b82f6',
        },
        accent: {
          DEFAULT: '#60a5fa',
          hover: '#3b82f6',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

