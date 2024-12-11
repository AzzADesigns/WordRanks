/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-bg": "#1C1D1F", // Define el color correctamente aquí
      },
    },
  },
  plugins: [],
}