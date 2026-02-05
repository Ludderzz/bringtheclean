/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btcGreen: '#10b981',
        btcBlue: '#0ea5e9',
        btcDark: '#0f172a',
      }
    },
  },
  plugins: [],
}