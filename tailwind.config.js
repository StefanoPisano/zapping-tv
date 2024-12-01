/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          orange: "#f9aa4b",
          darkblue: "rgba(17, 24, 39, 1)",
          blue: "#165E9E",
          lightblue: "#56a6e8"
        }
      }
    }
  },
  plugins: [],
}