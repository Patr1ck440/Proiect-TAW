<template>
  <div :class="['feedback', status]">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  status: String // "correct" sau "wrong"
})
</script>

<style scoped>

</style>
