import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)

// https://router.vuejs.org/guide/migration/#all-navigations-are-now-always-asynchronous
// is this needed?

router.isReady().then(() => app.mount('#app'))
