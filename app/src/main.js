import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)      // Pinia global
app.use(router)     // Router global
app.mount('#app')   // Mount o singură dată
