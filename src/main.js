import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).mount('#app')

createApp(App).use(router).mount('#app')