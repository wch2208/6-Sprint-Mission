/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        rokaf: ["ROKAF Sans", "sans-serif"],
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      colors: {
        divider: "#DFDFDF",
        "bland-blue": "#3692ff",
        "cool-gary-50": "#F9FAFB",
        "cool-gary-100": "#F3F4F6",
        "cool-gary-200": "#E5E7EB",
        "cool-gary-400": "#9CA3AF",
        "cool-gary-800": "#1F2937",
      },

      borderRadius: {
        "custom-bottom": "0 0 32px 32px",
      },
      width: {
        "btn-width": "88px",
      },
      height: {
        "btn-height": "42px",
      },
    },
  },
  plugins: [require("./plugins/boardsCustomUtilities")],
};
