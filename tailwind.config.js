/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        culture: {
          burgundy: "#6B1D2F",
          darkBurgundy: "#4A0E17",
          gold: "#D4AF37",
          lightGold: "#FBC270",
          obsidian: "#0D0D0F",
          cyanAccent: "#00F2FE",
        },
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Plus Jakarta Sans'", "sans-serif"],
        noto: ["'Plus Jakarta Sans'", "sans-serif"],
        bubble: ["'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
