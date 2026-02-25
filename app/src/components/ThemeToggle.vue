<template>
  <button @click="toggleTheme" class="theme-toggle flex items-center">
    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill mr-1" viewBox="0 0 16 16">
  
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill mr-1" viewBox="0 0 16 16">
    
    </svg>
    {{ isDark ? 'Întunecat' : 'Luminos' }}
  </button>
</template>

<script setup>
import { ref, watch } from 'vue'

const isDark = ref(false)

const emit = defineEmits(['theme-toggled'])

watch(isDark, (newValue) => {
  console.log(`Themetoggle.vue - Tema schimbată: ${newValue ? 'dark' : 'light'}`)
  emit('theme-toggled', newValue)
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>