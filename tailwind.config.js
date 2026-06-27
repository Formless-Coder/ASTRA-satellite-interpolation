export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050810',
        surface: '#0D1117',
        surface2: '#111827',
        border: '#1E293B',
        accent: '#3B82F6',
        accent2: '#06B6D4',
        glow: 'rgba(59,130,246,0.15)',
        panel: '#0A0F19'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0,0,0,0.25)',
        glow: '0 0 0 1px rgba(59,130,246,0.14), 0 20px 80px rgba(0,0,0,0.4)'
      }
    }
  },
  plugins: []
}
