/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qi-green': '#228B22',
        'qi-gold': '#DAA520',
        'qi-beige': '#FFF8DC',
        'qi-brown': '#8B4513',
        'qi-dark-green': '#0d4f0d',
        'qi-light-green': '#90EE90',
      },
      fontFamily: {
        'kai': ['KaiTi', 'STKaiti', 'serif'],
        'song': ['SimSun', 'STSong', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 139, 34, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(34, 139, 34, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}