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
        h1: ['2rem', { lineHeight: '2.5rem' }], // Mobile size for h1
        'h1-lg': ['3rem', { lineHeight: '3.5rem' }], // Desktop size for h1
        h2: ['1.75rem', { lineHeight: '2.25rem' }],
        'h2-lg': ['2.5rem', { lineHeight: '3rem' }],
        h3: ['1.5rem', { lineHeight: '2rem' }],
        'h3-lg': ['2rem', { lineHeight: '2.5rem' }],
        h4: ['1.25rem', { lineHeight: '1.75rem' }],
        'h4-lg': ['1.5rem', { lineHeight: '2rem' }],
        h5: ['0.8rem', { lineHeight: '1.5rem' }],
        'h5-lg': ['1rem', { lineHeight: '1.75rem' }],
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