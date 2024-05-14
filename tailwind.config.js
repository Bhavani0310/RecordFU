/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "rgb(235,124,73)",
        lightGray: "[rgba(0, 0, 0, 0.3)]",
      },
    },
  },
  plugins: [],
};
