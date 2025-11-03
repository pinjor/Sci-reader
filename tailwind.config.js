/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        accent: {
          start: '#00C6FF',
          end: '#0072FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '16px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}

