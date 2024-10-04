/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#1d1d1d',
        white: '#ffffff',
        whiteBackground: '#f7f7f7',
        accent: '#e11e22',
        white25: 'rgba(255, 255, 255, 0.25)',
        black75: 'rgba(29, 29, 29, 0.75)',
        black25: 'rgba(29, 29, 29, 0.25)',
        black10: 'rgba(29, 29, 29, 0.1)',
        errorColor: 'red',
      },
    },
  },
  plugins: [],
};
