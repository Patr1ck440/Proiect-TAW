<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const main = document.querySelector('main')
  if (main) {
    main.style.border = '1px solid #ccc'   
    main.style.borderRadius = '12px'       
  }
})
</script>

<template>
  <!-- componentă statică -->
  <div style="display: none"></div>
</template>
