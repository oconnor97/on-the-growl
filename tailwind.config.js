module.exports = {
  purge: [
    '/views/layouts/main.handlebars',
    '/views/dashboard.handlebars',
    '/views/homepage.handlebars',
    '/views/login.handlebars'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#a1e8cc", //magic mint
      secondary: '#eddfef', //pale purple pantone
      alert: '#ef476f', //paradise pink
      accent_dark: '#495159', //charcoal
      accent_light: '#ffd275' //orange yellow crayola
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
