import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#313131",
        yellow: "#fdd201",
        indigo: {
          400: "#85a5ff",
          950: "#030852",
        },
        blue: {
          950: "#070f61",
        },
        emerald: {
          600: "#11A864",
        },
      },
      backgroundImage: {
        loginGradient: "linear-gradient(to bottom, #030852, #070f61, #2f54eb, #85a5ff)",
      },
    },
  },
  plugins: [],
};
export default config;
