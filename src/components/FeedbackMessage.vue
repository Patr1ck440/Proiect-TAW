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
.feedback {
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
}

.correct {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.wrong {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
