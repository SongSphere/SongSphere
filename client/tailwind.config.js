/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Inter", "sans-serif"],
      },
      colors: {
        navy: "#0B263A",
        lgrey: "#D9D9D9",
        lblue: "#637B8E",
        background: "#808184",
      },
    },

    plugins: [],
  },
};
