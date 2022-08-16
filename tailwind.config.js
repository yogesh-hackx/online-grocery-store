module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "head-black": "#313131",
        "grocery-green": "#8EBF30"
      },
    },
  },
  plugins: [],
  mode: "jit",
};
