/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Slate 900
        secondary: "#1e293b", // Slate 800
        accent: "#38bdf8", // Sky 400
        text: "#f8fafc", // Slate 50
        "text-muted": "#94a3b8", // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
}
