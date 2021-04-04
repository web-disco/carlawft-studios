module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: "1000px",
        md: "1000px",
        lg: "1000px",
        xl: "1000px",
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/forms'),
  ],
}
