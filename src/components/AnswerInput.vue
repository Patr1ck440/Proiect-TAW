<template>
  <div class="answer-input">
    <textarea v-model="answer" placeholder="Scrie răspunsul tău aici..." />
    <button @click="submitAnswer">Trimite</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const answer = ref('')
const emit = defineEmits(['send-answer'])

function submitAnswer() {
  emit('send-answer', answer.value)
  answer.value = '' // goli inputul
}
</script>

<style scoped>
.answer-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
textarea {
  width: 102%;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  resize: none;
}
button {
  align-self: flex-end;
  padding: 8px 16px;
}
</style>
