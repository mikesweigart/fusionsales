/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      // Premium easing tokens — Apple-style smooth deceleration, no snap.
      // Use `ease-apple` for entrance reveals and hover lifts;
      // `ease-out-quart` for snappier micro-interactions.
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      colors: {
        brand: {
          50:  '#fef7ed',
          100: '#fdebd3',
          200: '#fbd3a6',
          300: '#f8b56e',
          400: '#f59134',
          500: '#f37315',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
    },
  },
  plugins: [],
};
