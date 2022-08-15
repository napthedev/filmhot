/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#191A1F",
        "dark-lighten": "#27282e",
        primary: "#0D90F3",
      },
    },
  },
  plugins: [],
};
