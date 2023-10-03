/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#4474e3",
        "secondary-blue": "#0bc6ff",
      },
    },
  },
  plugins: [],
};
