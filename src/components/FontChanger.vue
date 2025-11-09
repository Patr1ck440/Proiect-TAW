<script setup>
import { onMounted } from 'vue'

// când componenta e montată, schimbăm fontul documentului
onMounted(() => {
  document.body.style.fontFamily = '"Arial", serif'
})
</script>

<template>
  <!-- componentă fără interacțiune, doar setează fontul -->
  <div style="display: none"></div>
</template>
