import { createRouter, createWebHistory } from 'vue-router'
import MainArea from '../components/MainArea.vue'
import AboutPage from '../components/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainArea
  },
  {
    path: '/despre',
    name: 'about',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
