<template>
  <div class="question-box">
    <h2>{{ question }}</h2>
  </div>
</template>

<script setup>
defineProps(['question'])
</script>

<style scoped>
.question-box {
  font-size: 1.5rem;
  background: #eef;
  padding: 20px;
  border-radius: 12px;
}
</style>
