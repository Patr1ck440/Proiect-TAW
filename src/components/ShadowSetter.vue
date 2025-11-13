<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const main = document.querySelector('main')
  if (main) {
    main.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
    main.style.borderRadius = '12px' 
  }
})
</script>

<template>

  <div style="display: none"></div>
</template>
