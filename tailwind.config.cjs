// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    fontFamily: {
      megrim: ['"Megrim"', "cursive"],
    },
  },
  // darkMode: "class",
  daisyui: {
    themes: ["dark"],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
