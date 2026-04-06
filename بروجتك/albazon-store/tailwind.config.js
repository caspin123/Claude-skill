/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3B0764',
          950: '#2E1065',
        },
        surface: {
          DEFAULT: '#0F0F23',
          50: '#13132B',
          100: '#1E1C35',
          200: '#27273B',
          300: '#353548',
          400: '#4B4B66',
        },
        accent: {
          DEFAULT: '#F43F5E',
          light: '#FB7185',
          dark: '#E11D48',
        },
        neon: {
          cyan: '#00F5FF',
          green: '#06D6A0',
          pink: '#FF006E',
          purple: '#A78BFA',
        },
        muted: {
          DEFAULT: '#94A3B8',
          dark: '#64748B',
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 60%)',
        'card-glow': 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(124,58,237,0.4)',
        'glow-sm': '0 0 30px -8px rgba(124,58,237,0.3)',
        'glow-accent': '0 0 30px -8px rgba(244,63,94,0.3)',
        card: '0 8px 32px rgba(0,0,0,0.5)',
        'neon': '0 0 10px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.15)',
        'neon-accent': '0 0 10px rgba(244,63,94,0.3), 0 0 40px rgba(244,63,94,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(124,58,237,0.35)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
