<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const main = document.querySelector('main')
  if (main) {
    main.style.padding = '2rem'   // padding de 32px pe toate laturile
  }
})
</script>

<template>
  
  <div style="display: none"></div>
</template>
