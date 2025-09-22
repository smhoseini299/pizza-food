/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        'primary-dark': '#E55A2B',
        secondary: '#FFA726',
        accent: '#FF8A50',
        'text-primary': '#1A202C',
        'text-secondary': '#4A5568',
        'text-muted': '#718096',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F7FAFC',
      },
      fontFamily: {
        'vazir': ['Vazirmatn', 'Inter', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(255, 107, 53, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'pizza': '0 16px 48px rgba(0, 0, 0, 0.24)',
      },
      backdropBlur: {
        '25': '25px',
      },
      spacing: {
        '15': '3.75rem',
        '87.5': '21.875rem',
      },
      width: {
        '25': '6.25rem',
        '65': '16.25rem',
        '70': '17.5rem',
        '75': '18.75rem',
        '87.5': '21.875rem',
      },
      height: {
        '25': '6.25rem',
        '65': '16.25rem',
        '70': '17.5rem',
        '75': '18.75rem',
        '15': '3.75rem',
        '87.5': '21.875rem',
      },
      scale: {
        '102': '1.02',
        '108': '1.08',
        '115': '1.15',
        '120': '1.2',
        '125': '1.25',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 30s linear infinite',
        'pizza-rotate': 'pizzaRotate 0.8s ease-in-out',
        'bounce-in': 'bounceIn 0.6s ease',
        'slide-in-right': 'slideInRight 0.5s ease',
        'fade-in': 'fadeIn 0.3s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pizzaRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
