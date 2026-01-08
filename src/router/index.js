import { createRouter, createWebHistory } from 'vue-router'

import QuizPage from '@/pages/QuizPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import ThemePage from '@/pages/ThemePage.vue'
import FontPage from '@/pages/FontPage.vue'
import ChaptersPage from '@/pages/ChaptersPage.vue'
import ChapterPage from '@/pages/ChapterPage.vue'
import ScoreboardPage from '@/pages/ScoreboardPage.vue'
import ResultPage from '@/pages/ResultPage.vue'



const routes = [
  { path: '/', name: 'quiz', component: QuizPage },
  { path: '/despre', name: 'about', component: AboutPage },
  {
    path: '/profil',
    component: ProfilePage,
    children: [
      { path: 'scor', name: 'profile-score', component: ScoreboardPage },
      { path: 'rezultat', name: 'profile-result', component: ResultPage }
    ]
  },
  {
    path: '/setari',
    component: SettingsPage,
    children: [
      { path: 'tema', name: 'theme', component: ThemePage },
      { path: 'font', name: 'font', component: FontPage }
    ]
  },
  { path: '/capitole', name: 'chapters', component: ChaptersPage },
  { path: '/capitole/:id', name: 'chapter', component: ChapterPage },
  { path: '/:pathMatch(.*)*', redirect: '/' } // fallback 404
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
