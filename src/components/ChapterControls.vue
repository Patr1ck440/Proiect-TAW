<template>
  <div class="controls">
    <button @click="$emit('next')">Următorul test</button>
    <button @click="$emit('restart')">Reia testul</button>
    <button @click="$emit('show-incorrect')">Vezi greșelile</button>
  </div>
</template>

<script setup>
defineEmits(['next','restart','show-incorrect'])
</script>

<style scoped>

</style>
