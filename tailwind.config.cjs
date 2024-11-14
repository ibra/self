const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Jetbrains Mono", ...defaultTheme.fontFamily.mono],
      },
      animation: { fade: "enter .5s both" },
      keyframes: {
        enter: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "none" },
        },
      },
    },
  },
  plugins: [],
};
