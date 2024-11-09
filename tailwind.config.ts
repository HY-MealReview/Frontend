/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#134B84",
        white: "#FFFFFF",
        "black-70": "rgba(0,0,0,0.7)",
      },
      boxShadow: {
        "custom-shadow": "1px 2px 8px 0 rgba(0,0,0,0.04)",
        "span-shadow": "1px 1px 8px 0 rgba(0,0,0,0.12)",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeUpTodown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ",
        fadeUpToDown: "fadeUpTodown 0.5s",
      },
    },

    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
  },
  plugins: [],
};
