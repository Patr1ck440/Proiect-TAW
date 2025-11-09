<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const main = document.querySelector('main')
  if (main) {
    main.style.border = '1px solid #ccc'   // border gri deschis
    main.style.borderRadius = '12px'       // colțuri rotunjite
  }
})
</script>

<template>
  <!-- componentă statică -->
  <div style="display: none"></div>
</template>
