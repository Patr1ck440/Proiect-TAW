<template>
  <header class="flex justify-between items-center bg-blue-600 text-white p-4 shadow" id="titlu">
    
    <h1 class="text-xl font-bold">{{ title }}</h1>

   
    <button 
      @click="$emit('exercitii')" 
      class="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 mr-2"
    >
      Exerciții
    </button>

    <button 
      @click="$emit('rezultate')" 
      class="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 mr-2"
    >
      Capitole
    </button>

     <button 
      @click="$emit('about')" 
      class="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 mr-2"
    >
      Despre
    </button>

    <button 
      @click="$emit('profile')" 
      class="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 mr-2"
    >
      Profil
    </button>

    <button 
      @click="$emit('setari')" 
      class="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 mr-2"
    >
      Setări
    </button>

  
      <!-- BUTONUL DE TEMA MODIFICAT -->
    <button 
      @click="toggleTheme" 
      class="flex items-center bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-yellow-300 dark:hover:bg-gray-600"
    >
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill mr-1" viewBox="0 0 16 16">
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill mr-1" viewBox="0 0 16 16">
        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
      </svg>
      {{ isDark ? 'Întunecat' : 'Luminos' }}
    </button>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
import { useUserStore } from '@/stores/userStore'

// Store-uri Pinia
const settingsStore = useSettingsStore()
const userStore = useUserStore()

// Props pentru titlu
const props = defineProps(['title'])

// Emit pentru butoane
const emit = defineEmits(['exercitii', 'rezultate', 'about', 'profile', 'setari', 'toggle-theme'])

// Tema din store (în loc de ref local)
const isDark = computed(() => settingsStore.getTheme === 'dark')

// WATCH pentru tema
watch(isDark, (newValue) => {
  console.log(` Watch activat: Tema s-a schimbat la ${newValue ? 'dark' : 'light'}`)
  
  // Aplică clasa pe body/html
  if (newValue) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark-mode')
  }
  
  // Emite evenimentul către componenta părinte
  emit('toggle-theme', newValue)
})

// Funcția pentru toggle - folosește store-ul
const toggleTheme = () => {
  const newTheme = settingsStore.getTheme === 'light' ? 'dark' : 'light'
  settingsStore.setTheme(newTheme)
  console.log(` Tema a fost toggle-uită la: ${newTheme}`)
}

// Inițializare la mount
onMounted(() => {
  // Încarcă setările din localStorage în store
  settingsStore.loadSettings()
  
  // Aplică clasa imediat dacă e cazul
  if (settingsStore.getTheme === 'dark') {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark-mode')
  }
})
</script>

<style scoped>
/* Tranziții pentru butoane */
button {
  transition: all 0.3s ease;
}

/* Stiluri pentru dark mode */
.dark-mode header {
  background-color: #1e293b;
}

.dark-mode button:not(:last-child) {
  background-color: #374151;
  color: #f3f4f6;
}

.dark-mode button:not(:last-child):hover {
  background-color: #4b5563;
}
</style>