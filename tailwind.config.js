/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF0000',
      },
      fontSize: {
        h1: ['3rem', { lineHeight: '3.5rem' }],
        h2: ['2.5rem', { lineHeight: '3rem' }],
        h3: ['2rem', { lineHeight: '2.5rem' }],
        h4: ['1.5rem', { lineHeight: '2rem' }],
        h5: ['1rem', { lineHeight: '1.75rem'}],
      },
      fontWeight: {
        bold: '600', 
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}