import type { Config } from 'tailwindcss';

const colors = require('tailwindcss/colors');
const flowbite = require('flowbite-react/tailwind');

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        blue: colors.blue,
        white: colors.white,
        gray: colors.neautral,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      fontSize: {
        '32px': '32px',
      },
    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
