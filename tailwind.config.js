module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: false,
    themes: false,
    base: true,
    utils: true,
    logs: false,
    prefix: "d-"
  },
}