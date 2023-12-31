/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,jsx,tsx,js}"],
  theme: {
    extend: {
      screens: {
        "md-sm": { max: "767px" },
        "res-table": { min: "1275px" },
      },
      backgroundColor: {
        "bg-table": "#f0f2f8",
        "aside-bg": "#1c232f",
        "aside-title": "#161c25",
      },
      borderColor: {
        gr: "#f1f1f1",
        search: "#ced4da",
      },
      fontFamily: {
        title: "Inter",
      },
      fontSize: {
        title: "16px",
        subtitle: "13px",
      },
      colors: {
        titleColor: "#aeb1b6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
