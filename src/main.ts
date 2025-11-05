import { createApp } from 'vue'
import App from './App.vue'

// Importar Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { vMaska } from 'maska/vue'
// Importar íconos opcionales (Material Design Icons)
import '@mdi/font/css/materialdesignicons.css'

import router  from './routes'
import { es } from 'vuetify/locale'
import type { ThemeDefinition } from 'vuetify'


// Resolve initial theme from localStorage or system preference
const storedTheme = (typeof window !== 'undefined' && window.localStorage.getItem('theme')) as 'light' | 'dark' | null
const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultThemeName: 'light' | 'dark' = storedTheme ?? (prefersDark ? 'dark' : 'light')

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#1976D2',
    secondary: '#424242',
    error: '#D32F2F',
    info: '#0288D1',
    success: '#2E7D32',
    warning: '#ED6C02'
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#90CAF9',
    secondary: '#B0BEC5',
    error: '#EF9A9A',
    info: '#81D4FA',
    success: '#A5D6A7',
    warning: '#FFCC80'
  }
}

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'es',
    fallback: 'en',
    messages: { es },
  },
  theme: {
    defaultTheme: defaultThemeName,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
})

const pinia = createPinia();

createApp(App)
.directive('maska', vMaska)
.use(vuetify)
.use(router)
.use(pinia)
.mount('#app')
