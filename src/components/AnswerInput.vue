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

</style>
