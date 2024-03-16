// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "primary-blue": "#4474e3",
//         "secondary-blue": "#0bc6ff",
//       },

//       animation: {
//         rotateY: "rotateY 5s linear infinite",
//       },

//       keyframes: {
//         rotateY: {
//           "0%": {
//             transform: "rotateY(0deg)",
//           },
//           "100%": {
//             transform: "rotateY(360deg)",
//           },
//         },
//       },
//       screens: {
//         xs: "475px",
//       },
//     },
//   },
//   plugins: [],
//   darkMode: "class",
// };

// tailwind.config.js
// const { nextui } = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#4474e3",
        "secondary-blue": "#0bc6ff",
      },

      animation: {
        rotateY: "rotateY 5s linear infinite",
      },

      keyframes: {
        rotateY: {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },

      screens: {
        xs: "475px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
