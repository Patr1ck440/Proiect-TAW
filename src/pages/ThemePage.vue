<template>
  <div class="theme-page p-6">
    <h1 class="text-2xl font-bold mb-4">Theme Settings</h1>
    <ThemeToggle :isDark="isDark" @toggle-theme="toggleTheme" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const isDark = ref(false)
function toggleTheme() {
  isDark.value = !isDark.value
}
</script>
