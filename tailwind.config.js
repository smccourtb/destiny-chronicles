/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': '#12171d',
        'background-light': '#232936',
        accent: '#967526',
        highlight: '#ffce1f',
        white: '#f5f5f5',
      },
      backgroundImage: { gotham: 'radial-gradient(at center center, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))' },
    },
    plugins: [],
  },
}
