<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settingsStore'
import { useUserStore } from '@/stores/userStore'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// Router
const router = useRouter()

// Store-uri Pinia
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const appTitle = 'EduBac'

// Folosește store-urile pentru tema și font
const isDark = computed(() => settingsStore.getTheme === 'dark')
const selectedFont = computed(() => settingsStore.getFontFamily)

// WATCH pentru tema din store
watch(() => settingsStore.getTheme, (newTheme) => {
  console.log(`🎨 Tema schimbată la ${newTheme}`)
  
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

// WATCH pentru font din store
watch(() => settingsStore.getFontFamily, (newFont) => {
  console.log(`✏️ Font schimbat la: ${newFont}`)
})

// Funcția pentru toggle theme - folosește store-ul
function handleToggleTheme() {
  const newTheme = settingsStore.getTheme === 'light' ? 'dark' : 'light'
  settingsStore.setTheme(newTheme)
}

// Funcțiile pentru navigare rămân la fel
function navigateToAbout() {
  router.push('/despre')
}

function navigateToExercises() {
  router.push('/')
}

function navigateToChapters() {
  router.push('/capitole')
}

function navigateToProfile() {
  router.push('/profil')
}

function navigateToSettings() {
  router.push('/setari')
}

// Funcție pentru font - folosește store-ul
function updateFont(newFont) {
  settingsStore.setFontFamily(newFont)
}

// Inițializare la mount
onMounted(() => {
  // Încarcă setările din localStorage în store
  settingsStore.loadSettings()
  
  // Verifică dacă avem utilizator autentificat
  if (!userStore.isUserAuthenticated) {
    // Setează utilizator demo
    userStore.login({
      name: 'Utilizator EduBac',
      email: 'utilizator@edubac.ro',
      level: 1,
      points: 0,
      joinDate: new Date().toISOString().split('T')[0]
    })
  }
  
  // Actualizează streak-ul zilnic
  userStore.updateStreak()
  
  // Aplică tema curentă imediat
  const currentTheme = settingsStore.getTheme
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <div 
    :style="{ fontFamily: selectedFont }" 
    :class="['min-h-screen transition-all duration-300', 
            isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900']"
  >
    <Header 
      :title="appTitle"
      :is-dark="isDark"
      @toggle-theme="handleToggleTheme"
      @about="navigateToAbout"
      @exercitii="navigateToExercises"
      @rezultate="navigateToChapters"
      @profile="navigateToProfile"
      @setari="navigateToSettings"
    />

    <main class="p-6 min-h-[70vh] bg-white dark:bg-gray-800 transition-colors duration-300">
      <RouterView 
        :selected-font="selectedFont" 
        :update-font="updateFont"
        :is-dark="isDark"
      />
    </main>

    <Footer class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300" />
  </div>
</template>

<style>
/* Stilurile rămân aceleași */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease,
              box-shadow 0.3s ease;
}
</style>