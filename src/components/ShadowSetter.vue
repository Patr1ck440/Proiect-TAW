<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const main = document.querySelector('main')
  if (main) {
    main.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)' // shadow subtil
    main.style.borderRadius = '12px' // opțional: rotunjim colțurile
  }
})
</script>

<template>
  <!-- componentă statică, nu afișează nimic -->
  <div style="display: none"></div>
</template>
