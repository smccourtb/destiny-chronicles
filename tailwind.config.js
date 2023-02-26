/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#12171d",
        "background-light": "#232936",
        accent: "#967526",
        highlight: "#ffce1f",
        white: "#f5f5f5",
      },
    },
    plugins: [],
  },
};
