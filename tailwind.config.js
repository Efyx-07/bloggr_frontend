/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#1d1d1d',
        whiteRelief: '#ffffff',
        whiteBackground: '#F3F4F6',
        accent: '#CA244D',
        white25: 'rgba(255, 255, 255, 0.25)',
        black75: 'rgba(29, 29, 29, 0.75)',
        black25: 'rgba(29, 29, 29, 0.25)',
        black10: 'rgba(29, 29, 29, 0.1)',
        greenColor: 'rgba(22, 163, 74)',
        errorColor: 'red',
      },
      maxWidth: {
        content: '90rem',
        smallForm: '30rem',
        largeForm: '60rem',
      },
    },
  },
  plugins: [],
};
