/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        slide: 'slide-from-left .2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      },
      backgroundImage: { gotham: 'radial-gradient(at center center, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))' },
      colors: {
        'background-dark': '#12171d',
        'background-light': '#232936',
        accent: '#967526',
        highlight: '#ffce1f',
        white: '#f5f5f5',
        'modifier-blue': '#5b94be',
      },
      keyframes: {
        'slide-from-left': {
          '0%': { transform: 'translateX(200%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
    plugins: [],
  },
}
