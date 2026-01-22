<template>
  <div class="score-page p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="header-section mb-8">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Tabla de Scoruri</h2>
      <p class="text-gray-600 dark:text-gray-300">Urmărește-ți progresul și compară-te cu alții</p>
    </div>

    <!-- Statistici rapide -->
    <div class="quick-stats grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="stat-card bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-blue-700 dark:text-blue-300">Scor mediu</h3>
        <p class="text-2xl font-bold text-blue-800 dark:text-blue-200">{{ stats.averageScore }}%</p>
      </div>
      
      <div class="stat-card bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-green-700 dark:text-green-300">Acuratețe</h3>
        <p class="text-2xl font-bold text-green-800 dark:text-green-200">{{ stats.accuracy }}%</p>
      </div>
      
      <div class="stat-card bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-purple-700 dark:text-purple-300">Rank global</h3>
        <p class="text-2xl font-bold text-purple-800 dark:text-purple-200">#{{ userRank }}</p>
      </div>
      
      <div class="stat-card bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <h3 class="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Încercări</h3>
        <p class="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{{ stats.totalAttempts }}</p>
      </div>
    </div>

    <!-- Ultimul scor -->
    <div class="latest-score mb-8" v-if="latestScore">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 class="text-xl font-bold mb-2">Ultimul rezultat</h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg">{{ latestScore.quizTitle }}</p>
            <p class="text-sm opacity-90">{{ latestScore.date }} • {{ latestScore.timeSpent }}</p>
          </div>
          <div class="text-right">
            <p class="text-4xl font-bold">{{ latestScore.score }}/{{ latestScore.maxScore }}</p>
            <p class="text-sm">{{ latestScore.correctAnswers }}/{{ latestScore.totalQuestions }} corecte</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scoruri detaliate -->
    <div class="detailed-scores mb-8">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Istoric complet</h3>
      
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="py-3 px-4 text-left">Quiz</th>
              <th class="py-3 px-4 text-left">Scor</th>
              <th class="py-3 px-4 text-left">Corecte</th>
              <th class="py-3 px-4 text-left">Timp</th>
              <th class="py-3 px-4 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="score in allScores" :key="score.id" 
                class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4">{{ score.quizTitle }}</td>
              <td class="py-3 px-4">
                <span class="font-bold" :class="{
                  'text-green-600': score.score >= 80,
                  'text-yellow-600': score.score >= 60 && score.score < 80,
                  'text-red-600': score.score < 60
                }">
                  {{ score.score }}%
                </span>
              </td>
              <td class="py-3 px-4">{{ score.correctAnswers }}/{{ score.totalQuestions }}</td>
              <td class="py-3 px-4">{{ score.timeSpent }}</td>
              <td class="py-3 px-4">{{ score.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Componenta ScoreBoard simplificată -->
    <div class="scoreboard-component mb-8">
      <ScoreBoard 
        :correct="stats.totalCorrect" 
        :wrong="stats.totalAttempted - stats.totalCorrect"
        :score="stats.averageScore"
      />
    </div>

    <!-- Top scoruri -->
    <div class="top-scores" v-if="highScores.length > 0">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Top 10 scoruri</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div v-for="(score, index) in highScores.slice(0, 10)" :key="score.id"
             class="top-score-card p-4 rounded-lg bg-gradient-to-br"
             :class="getTopScoreClass(index)">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl font-bold">#{{ index + 1 }}</span>
            <span class="text-lg font-semibold">{{ score.score }}%</span>
          </div>
          <p class="text-sm truncate">{{ score.quizTitle }}</p>
          <p class="text-xs opacity-75">{{ score.date }}</p>
        </div>
      </div>
    </div>

    <!-- Distribuția scorurilor -->
    <div class="distribution-section mt-8">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Distribuția scorurilor</h3>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div v-for="(count, range) in scoreDistribution" :key="range" class="mb-3">
          <div class="flex justify-between mb-1">
            <span class="text-gray-700 dark:text-gray-300">{{ range }}%</span>
            <span class="font-medium">{{ count }} {{ count === 1 ? 'quiz' : 'quiz-uri' }}</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div class="h-2.5 rounded-full bg-blue-600" 
                 :style="{ width: `${(count / allScores.length) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Acțiuni -->
    <div class="actions-section mt-8 flex gap-4">
      <button @click="exportScores" 
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Exportă scoruri
      </button>
      <button @click="clearScores" 
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Șterge istoric
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useScoreStore } from '@/stores/scoreStore'
import ScoreBoard from '@/components/ScoreBoard.vue'

// 🔥 PINIA STORES
const scoreStore = useScoreStore()

// ===== COMPUTED PROPERTIES =====
const allScores = computed(() => scoreStore.getAllScores)
const highScores = computed(() => scoreStore.getHighScores)
const userRank = computed(() => scoreStore.getUserRank)
const scoreDistribution = computed(() => scoreStore.getScoreDistribution)
const latestScore = computed(() => {
  const scores = scoreStore.getAllScores
  return scores.length > 0 ? scores[scores.length - 1] : null
})

const stats = computed(() => scoreStore.calculateStatistics())

// ===== METHODS =====
function getTopScoreClass(index) {
  const colors = [
    'from-yellow-400 to-yellow-500',
    'from-gray-300 to-gray-400',
    'from-orange-400 to-orange-500',
    'from-blue-100 to-blue-200',
    'from-blue-100 to-blue-200'
  ]
  return index < colors.length ? colors[index] : 'from-gray-100 to-gray-200'
}

function exportScores() {
  scoreStore.exportScores()
}

function clearScores() {
  if (confirm('Sigur vrei să ștergi toate scorurile? Această acțiune este ireversibilă.')) {
    scoreStore.clearAllScores()
  }
}

// Initialize on mount
onMounted(() => {
  scoreStore.updateHighScores()
})
</script>

<style scoped>
.score-page {
  min-height: 100vh;
  background: linear-gradient(135deg, darkcyan 0%, darkcyan 100%);
}

.dark .score-page {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.stat-card {
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.top-score-card {
  transition: all 0.3s ease;
}

.top-score-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>