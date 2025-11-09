<script setup>
import { onMounted } from 'vue'

// când componenta e montată, setăm background-ul fix
onMounted(() => {
  document.body.style.backgroundColor = 'darkcyan' // albastru deschis
})
</script>

<template>
  <!-- componentă statică, fără vizual pe ecran -->
  <div style="display: none"></div>
</template>
