import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/atoms/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/molecules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E44AE",
        secondary: "#F7B538 ",
        accent: "#FF0000",
        "dark-text": "#110321",
        "dark-bg": "#021f3b",
        "light-text": "#F2EDF8",
        "light-bg": "#EBF9F7",
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
      fontFamily: {
        sans: ["Raleway"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
