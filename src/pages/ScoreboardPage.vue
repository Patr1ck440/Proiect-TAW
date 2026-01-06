<template>
  <div class="score-page p-6">
    <h2 class="text-xl font-bold mb-4">Scorul tău</h2>
    <ScoreBoard :correct="correctCount" :wrong="incorrectCount" />
  </div>
</template>

<script setup>
import ScoreBoard from '@/components/ScoreBoard.vue'
import { ref } from 'vue'

const correctCount = ref(5) // aici poți să iei din Pinia store
const incorrectCount = ref(2)
</script>
