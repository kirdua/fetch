// Styles
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import 'vuetify/styles'

const myCustomTheme = {
  dark: false,
  colors: {
    background: '#F7F7F7',
    white: '#fdfdff',
    'dark-blue': '#0F2A5F',
    'blue-1': '#22D1EE',
    'blue-2': '#E2F3F5',
    red: '#FF5959',
    'soft-red': '#FA7070',
    primary: '#3D5AF1',
    error: '#FF5252',
    info: '#baf2d8',
    success: '#baf2bb',
    warning: '#f2e2ba',
    'mid-grey': '#36454f',
    'light-teal': '#008080',
  },
}

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
    options: {
      customProperties: true,
    },
  },
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
