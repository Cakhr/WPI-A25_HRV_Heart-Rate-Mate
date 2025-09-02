/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      background: 'var(--background)',
      primary: 'var(--primary)',
      card: {
        DEFAULT: 'var(--card)',
        variant: 'var(--card-variant)'
      },
      accent: 'var(--accent)',
      text: {
        DEFAULT: 'var(--text)',
        muted: 'var(--text-muted)'
      },
      icon: {
        DEFAULT: 'var(--icon-stroke)',
        stroke: 'var(--icon-stroke)'
      }
    },
    extend: {}
  },
  plugins: []
};
