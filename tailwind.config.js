/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: '#0F3F23',
          primary: '#1B6535',
          mid: '#237B42',
          soft: '#E5F4E9',
        },
        parchment: '#F6F4ED',
        warmSand: '#EFECE5',
        borderSoft: '#DCE3DC',
        cacaoBrown: '#634434',
        fitomolGold: '#F2B705',
        dangerRed: '#B91C1C',
        dangerSoft: '#FEECEC',
        warningAmberSoft: '#FFF7E0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(15, 63, 35, 0.06), 0 1px 3px rgba(15, 63, 35, 0.04)',
        hero: '0 10px 24px -6px rgba(217, 78, 4, 0.34)',
        nav: '0 -4px 16px rgba(15, 63, 35, 0.06)',
      },
    },
  },
  plugins: [],
};
