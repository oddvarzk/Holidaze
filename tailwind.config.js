/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paleSand: '#F4F0D8',
        charcoal: '#333333',
      },
    },
  },
  plugins: [],
}
