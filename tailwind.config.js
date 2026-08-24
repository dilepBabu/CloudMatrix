/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#F6FBFA',
          surface: '#FFFFFF',
          ink: '#0B2B2E',
          muted: '#5C7A7C',
          line: '#DCEBEA',
        },
        dark: {
          bg: '#071417',
          surface: '#0E2226',
          ink: '#EAF6F5',
          muted: '#7FA3A2',
          line: '#173538',
        },
        teal: {
          50: '#EAFBFA',
          100: '#CFF3F1',
          300: '#7FDAD6',
          500: '#14A6A2',
          600: '#0F8B8D',
          700: '#0A5F63',
          800: '#083F42',
          900: '#052729',
        },
        accent: {
          orange: '#F2994A',
          yellow: '#F2C94C',
          green: '#6FCF97',
          blue: '#4FA3D1',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'node-gradient': 'linear-gradient(135deg, #F2994A 0%, #F2C94C 45%, #6FCF97 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0A5F63 0%, #0F8B8D 55%, #14A6A2 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(20,166,162,0.25)',
        card: '0 10px 40px -12px rgba(10,60,63,0.18)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-node': {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.25)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 38s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-node': 'pulse-node 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
