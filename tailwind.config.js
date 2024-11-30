/** @type {import('tailwindcss').Config} */
const tokyoNightColors = {
  night: {
    bg: "#1a1b26",
    fg: "#a9b1d6",
    blue: "#7aa2f7",
    cyan: "#7dcfff",
    green: "#9ece6a",
    magenta: "#bb9af7",
    red: "#f7768e",
    yellow: "#e0af68",
  },
};

module.exports = {
  content: [
  "./src/**/*.{js,ts,jsx,tsx}", // Sesuaikan dengan struktur folder proyek
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokyoNightColors.night,
    },
  },
  plugins: [],
};

