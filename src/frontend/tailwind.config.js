module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#69d582',
        'base': '#ffff',
        'base-variant': '#e8e9ed',
        'focus-text': '#397347',
        'input': 'rgba(243, 240, 255, 0.7)',
        'error': '#f06272',
        'text': '#000000',
        'text-variant': '#777777',
        'theme-icon': '#070b1e',
        'link-theme': '#56ab6c',
        'darkmode-base': '#070b1d',
        'darkmode-base-variant': '#101425',
        'darkmode-text': '#ffffff',
        'darkmode-text-variant': '#334075',
        'darkmode-theme-icon': '#ffffff',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'], // Add your font stack here
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '1000px',
      },
      padding: {
        'p-1': '1rem',
        'p-2': '0.5rem',
        'p-3': '3.125rem',
        'p-4': '5rem',
      },
      width: {
        'auth': 'max(40%, 37.5rem)',
        'auth-sm': 'min(37.5rem, 100%)',
        'input': '25rem',
        'sidebar': '15.625rem',
      },
      height: {
        'vh-100': '100vh',
        'auth-input': '3.125rem',
        'theme-switch': '3.125rem',
      },
      boxShadow: {
        'md': '0.1875rem 0.1875rem 0.3125rem rgba(0, 0, 0, 0.1)',
        'lg': '-0.625rem 0 0.625rem rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      backgroundImage: {
        'placeholder': "url('/src/pictures/placeholder.jpg')",
      },
    },
  },
  plugins: [],
}
