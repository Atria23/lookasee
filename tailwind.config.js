/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'utama': '#0D99FF',
        'text_utama': '#333333',
        'putih': '#f2f2f2',
        'cream': '#FEE9DE',
        'kuning': '#F2C94C',
        'bg_utama': '#DEDEDE',
      },
      fontFamily: {
        utama: ['Rubik'],
        hero: ['Lobster Two'],
        poppins: ['Poppins'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '60px',
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
  }
  