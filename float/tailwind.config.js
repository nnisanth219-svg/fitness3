/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2C2C2C',
        navy: '#1A2332',
        cream: '#FAF8F3',
        sage: '#7D8471',
        'dusty-blue': '#6B8CAE',
        'soft-blue': '#8CA4C4',
        'deep-blue': '#4A6FA5',
        stone: '#9A9A9A',
        ivory: '#F7F5F0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 7vw, 6.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3.2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'float-bob': 'float-bob 4s ease-in-out infinite',
        'fade-rise': 'fade-rise 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'salt-dissolve': 'salt-dissolve 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
    },
  },
  plugins: [],
};