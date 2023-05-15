/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   black: {
    //     light: "#000",
    //     dark: "#000",
    //   },
    //   grey: {
    //     light: "#e5e5ea",
    //     dark: "#2c2c2e",
    //   },
    //   white: {
    //     light: "#fff",
    //     dark: "#fff",
    //   },
    // },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
