<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'

const router = useRouter()
const appTitle = 'EduBac'
const isDark = ref(false)
const selectedFont = ref('Arial')

// WATCH 1 pentru tema - aplică clasa dark pe întregul document
watch(isDark, (newValue) => {
  console.log(`🎨 App.vue Watch 1: Tema schimbată la ${newValue ? 'dark' : 'light'}`)
  
  // Salvează în localStorage
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
  
  // Aplică clasa pe html element pentru Tailwind
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

// Funcția pentru toggle theme
function handleToggleTheme() {
  isDark.value = !isDark.value
  console.log(`🔄 Tema toggle-uită: ${isDark.value ? 'dark' : 'light'}`)
}

// Funcție pentru font
function updateFont(newFont) {
  selectedFont.value = newFont
  console.log(`✏️ Font schimbat la: ${newFont}`)
  
  // WATCH 2 pentru font - monitorizează schimbările de font
  // Poți avea un watch separat pentru font dacă ai nevoie
}

// WATCH 3 pentru font - dacă ai nevoie de alt watch
watch(selectedFont, (newFont, oldFont) => {
  console.log(`📝 App.vue Watch 3: Font schimbat de la "${oldFont}" la "${newFont}"`)
  
  // Salvează fontul în localStorage pentru persistăntă
  localStorage.setItem('app-font', newFont)
})

// Inițializare la mount
onMounted(() => {
  // Încarcă tema salvată
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
  }
  
  // Încarcă fontul salvat
  const savedFont = localStorage.getItem('app-font')
  if (savedFont) {
    selectedFont.value = savedFont
  }
  
  // WATCH 4 - adițional: monitorizează preferința sistemului pentru tema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    console.log(`🖥️ Sistemul a schimbat tema la: ${e.matches ? 'dark' : 'light'}`)
    
    // Dacă utilizatorul nu a setat o preferință explicită, urmează sistemul
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
    }
  })
})
</script>

<template>
  <!-- Aplica clasa dark pe întreaga aplicație -->
  <div 
    :style="{ fontFamily: selectedFont }" 
    :class="['min-h-screen transition-all duration-300', 
            isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900']"
  >
    <Header 
      :title="appTitle"
      :is-dark="isDark"
      @toggle-theme="handleToggleTheme"
      @about="router.push('/despre')"
      @exercitii="router.push('/')"
      @rezultate="router.push('/capitole')" 
      @profile="router.push('/profil')"  
      @setari="router.push('/setari')"  
    />

    <main class="p-6 min-h-[70vh] bg-white dark:bg-gray-800 transition-colors duration-300">
      <!-- Pasă toate props-urile necesare la RouterView -->
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
/* Tranziții smooth pentru întreaga aplicație */
* {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease,
              box-shadow 0.3s ease;
}

/* Asigură-te că html are clasa pentru Tailwind dark mode */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
}

.dark {
  --bg-primary: #1a202c;
  --text-primary: #f7fafc;
}

/* Poți adăuga și CSS custom pentru componente specifice */
.dark .card {
  background-color: #2d3748;
  border-color: #4a5568;
}

body,
.question-box,
.dark input,
.dark textarea,
.dark select {
  background-color: #4a5568;
  color: #f7fafc;
  border-color: #718096;
}
</style>