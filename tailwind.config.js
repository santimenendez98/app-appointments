/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,jsx,tsx,js}"],
  theme: {
    extend: {
      screens: {
        "md-sm": { max: "767px" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
