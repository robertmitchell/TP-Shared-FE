const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-children'),
  ],
  content: [],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        black: colors.black,
        amber: colors.amber,
        slate: colors.slate,
        yellow: colors.yellow,
        lime: colors.lime,
        red: colors.red,
      }),
      fontFamily: {
        sans: [
          'Inter var',
          ...defaultTheme.fontFamily.sans,
          'Graphik',
          'sans-serif',
        ],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
}
