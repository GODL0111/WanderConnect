import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#FF006E',
        accent: '#8338EC',
        dark: '#0A0E27',
        darker: '#05070F',
        light: '#F0F3FF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'bounce-custom': 'bounce-custom 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-custom': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 217, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 217, 255, 0.7)',
        'glow-secondary': '0 0 20px rgba(255, 0, 110, 0.5)',
        'glow-accent': '0 0 20px rgba(131, 56, 236, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
