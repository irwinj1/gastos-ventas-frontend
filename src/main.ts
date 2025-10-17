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

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia();

createApp(App)
.directive('maska', vMaska)
.use(vuetify)
.use(router)
.use(pinia)
.mount('#app')
