/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { main: "#134B84", white: "#FFFFFF" },
      boxShadow: {
        "custom-shadow": "1px 2px 8px 0 rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
