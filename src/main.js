import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

const app = createApp(App)
const store = createPinia()

loadFonts()

app.use(router).use(store).use(vuetify).mount('#app')
