<template>
  <button @click="$emit('toggle-theme')" class="theme-toggle">
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>
