module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#191A1F",
        "dark-lighten": "#27282e",
        primary: "#0D90F3",
      },
      gridTemplateColumns: {
        lg: "repeat(auto-fill, minmax(160px, 1fr))",
        sm: "repeat(auto-fill, minmax(130px, 1fr))",
      },
    },
  },
  plugins: [],
};
