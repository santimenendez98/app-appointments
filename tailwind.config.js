/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,jsx,tsx,js}"],
  theme: {
    extend: {
      screens: {
        "md-sm": { max: "767px" },
        "res-table": { min: "1275px" },
        "login-img": {max: "1275px"}
      },
      backgroundColor: {
        "bg-table": "#f0f2f8",
        "aside-bg": "#1c232f",
        "aside-title": "#161c25",
        "button-login" : "#34D2E0",
        "btn-hover": "#046BE0"
      },
      borderColor: {
        gr: "#f1f1f1",
        search: "#ced4da",
      },
      fontFamily: {
        title: "Inter",
        login: "Bebas Neue"
      },
      fontSize: {
        title: "16px",
        subtitle: "13px",
      },
      colors: {
        titleColor: "#aeb1b6",
        error: "#FF0000",
        logoColor: "#0975be"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
