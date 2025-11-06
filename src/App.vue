<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MainArea from './components/MainArea.vue' // 👈 importăm zona principală

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

    <!-- Zona principală (MainArea) -->
    <main class="p-6 min-h-[70vh]">
      <MainArea /> <!-- 👈 aici se va vedea întrebarea și câmpul de răspuns -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>
