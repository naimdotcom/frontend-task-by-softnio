/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primaryFont: "#364a63",
        secondaryFont: "#8091a7",
        purpleFont: "#6576ff",
        purple_watch: "#816bff",
        cyan_watch: "#1fcec9",
        blue_watch: "#4b97d3",
        dark_watch: "#3b4747",
      },
    },
  },
  plugins: [],
};
