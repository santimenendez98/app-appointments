/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,jsx,tsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
