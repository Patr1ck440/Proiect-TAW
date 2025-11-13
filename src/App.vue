<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
import BackgroundSetter from './components/BackgroundSetter.vue'
import ShadowSetter from './components/ShadowSetter.vue'
import BorderSetter from './components/BorderSetter.vue'
import PaddingSetter from './components/PaddingSetter.vue'

const appTitle = 'EduBac'
const isDark = ref(false)

function handleToggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  
  <BackgroundSetter />
  <ShadowSetter />
  <BorderSetter />
  <PaddingSetter />
  <div :class="isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'">
   
    <Header 
      :title="appTitle"
      @toggle-theme="handleToggleTheme"
      @about="$router.push('/despre')"
      @exercitii="$router.push('/')"
    />

    <main class="p-6 min-h-[70vh]">
      <RouterView /> 
    </main>

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
