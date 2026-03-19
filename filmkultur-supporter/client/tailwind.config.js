/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          800: '#1a5c5a',
          700: '#216e6b',
          600: '#287f7c',
          100: '#e6f4f4',
          50: '#f0f9f9',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
