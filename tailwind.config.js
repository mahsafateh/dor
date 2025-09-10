/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A0DAD',
        secondary: '#A78BFA',
        orange: '#FF9500',
        yellow: '#FFD700',
        pink: '#FF69B4',
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

