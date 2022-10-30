/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      ubuntu: "Ubuntu",
      roboto: "Roboto",
      rubik: "Rubik",
      worksans: "Roboto Slab",
    },
  },
  plugins: [],
};
