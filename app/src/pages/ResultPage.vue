<template>
  <div class="result-page p-6">
    <h2 class="text-xl font-bold mb-4">Rezultatele tale</h2>

    <div v-for="answer in userAnswers" :key="answer.question" class="mb-2">
      <p><strong>Întrebare:</strong> {{ answer.question }}</p>
      <p><strong>Răspunsul tău:</strong> {{ answer.userAnswer }}</p>
      <p :class="answer.correct ? 'text-green-600' : 'text-red-600'">
        {{ answer.correct ? 'Corect ✅' : 'Greșit ❌' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// În realitate, iei datele din Pinia store
const userAnswers = ref([
  { question: 'Ce este o variabilă?', userAnswer: 'spațiu de stocare', correct: true },
  { question: 'Tipul unei variabile întregi?', userAnswer: 'float', correct: false }
])
</script>
