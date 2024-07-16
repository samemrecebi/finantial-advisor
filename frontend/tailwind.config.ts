import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-800': '#003EB3',
        'violet-950': '#061178',
        'blue-600': '#136FF5',
        'sky-200': '#BAE0FF',
        'sky-100': '#E6F4FF',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        '32px': '32px',
      },
    },
  },
  plugins: [],
}

export default config
