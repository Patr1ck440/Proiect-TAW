<template>
  <h2 class="chapter-title">{{ title }}</h2>
</template>

<script setup>
defineProps(['title'])
</script>

<style scoped>
.chapter-title {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  color: black;
}
</style>
