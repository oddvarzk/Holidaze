/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paleSand: "##F5F5F0",
        charcoal: "#333333",
        tin: "#015D67",
        tiner: "#004850",
        btns: "#008897",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"], // for body text
        Playfair: ["Playfair Display", "serif"], // for headings
        Metamorphous: ["Metamorphous", "serif"], // for logo
      },
    },
  },
  plugins: [],
};
