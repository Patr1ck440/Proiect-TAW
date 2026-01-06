<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'

const appTitle = 'EduBac'
const isDark = ref(false)

// font global
const selectedFont = ref('Arial')

function handleToggleTheme() {
  isDark.value = !isDark.value
}

// funcție pentru FontChanger/FontPage
function updateFont(newFont) {
  selectedFont.value = newFont
}
</script>

<template>
  <div :style="{ fontFamily: selectedFont }" :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'">
    <Header 
      :title="appTitle"
      @toggle-theme="handleToggleTheme"
      @about="$router.push('/despre')"
      @exercitii="$router.push('/')"
      @rezultate="$router.push('/capitole')" 
      @profile="$router.push('/profil')"  
      @setari="$router.push('/setari')"  
    />

    <main class="p-6 min-h-[70vh]">
      <!-- pasam funcția updateFont la router-view -->
      <RouterView :selected-font="selectedFont" :update-font="updateFont"/> 
    </main>

    <Footer />
  </div>
</template>
