/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "rubik-sans": ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
