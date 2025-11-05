<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue' // 👈 importăm footerul

// variabile reactive
const appTitle = 'EduBac'
const isDark = ref(false)

// funcție pentru schimbarea temei
function handleToggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <div :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'">
    <!-- Header -->
    <Header :title="appTitle" @toggle-theme="handleToggleTheme" />

    <!-- Conținut principal -->
    <main class="p-6 min-h-[70vh]">
      <h2 class="text-2xl font-semibold mb-4">dsadsadasdsad👋</h2>
      <p>hrthrthtrhtrhrt</p>
    </main>

    <!-- Footer -->
    <Footer /> <!-- 👈 adăugat aici -->
  </div>
</template>

<style scoped></style>
