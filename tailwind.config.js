/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textUnderlineOffset: {
        3: '3px',
      },
      colors: {
        'custom-black': '#070707',
        'custom-btn': '#41B87E',
        'custom-pink': '#DD9CEE',
        'custom-white': '#FFFFFF',
        'custom-border': '#D9D9D9',
        'custom-yellow': '#FFCC4A',
        'custom-marq': '#B70404',
        'custom-glass': '#101010'
      },
    },
  },
  plugins: [],
}
