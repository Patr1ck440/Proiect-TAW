<script setup>
import { onMounted } from 'vue'


onMounted(() => {
  document.body.style.fontFamily = '"Arial", serif'
})
</script>

<template>
  <!-- componentă fără interacțiune, doar setează fontul -->
  <div style="display: none"></div>
</template>
