import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useScoreStore = defineStore('score', () => {
  // State
  const scores = ref([
    {
      id: 1,
      quizId: 1,
      quizTitle: 'Capitolul 1: Variabile',
      score: 85,
      maxScore: 100,
      date: '2024-01-10',
      timeSpent: '15:30',
      correctAnswers: 8,
      totalQuestions: 10
    },
    {
      id: 2,
      quizId: 2,
      quizTitle: 'Capitolul 2: Funcții',
      score: 90,
      maxScore: 100,
      date: '2024-01-09',
      timeSpent: '12:45',
      correctAnswers: 9,
      totalQuestions: 10
    }
  ])
  
  const highScores = ref([])
  const userRank = ref(150)
  const totalUsers = ref(1000)

  // Getters
  const getAllScores = computed(() => scores.value)
  const getHighScores = computed(() => highScores.value)
  const getUserRank = computed(() => userRank.value)
  const getTotalUsers = computed(() => totalUsers.value)
  const getAverageScore = computed(() => {
    if (scores.value.length === 0) return 0
    const total = scores.value.reduce((sum, score) => sum + score.score, 0)
    return Math.round(total / scores.value.length)
  })
  const getTotalCorrectAnswers = computed(() => {
    return scores.value.reduce((sum, score) => sum + score.correctAnswers, 0)
  })
  const getTotalQuestionsAttempted = computed(() => {
    return scores.value.reduce((sum, score) => sum + score.totalQuestions, 0)
  })
  const getAccuracyRate = computed(() => {
    const totalCorrect = getTotalCorrectAnswers.value
    const totalAttempted = getTotalQuestionsAttempted.value
    if (totalAttempted === 0) return 0
    return Math.round((totalCorrect / totalAttempted) * 100)
  })
  const getBestScore = computed(() => {
    if (scores.value.length === 0) return null
    return scores.value.reduce((best, current) => 
      current.score > best.score ? current : best
    )
  })
  const getWorstScore = computed(() => {
    if (scores.value.length === 0) return null
    return scores.value.reduce((worst, current) => 
      current.score < worst.score ? current : worst
    )
  })
  const getScoreDistribution = computed(() => {
    const distribution = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0
    }
    
    scores.value.forEach(score => {
      if (score.score >= 90) distribution['90-100']++
      else if (score.score >= 80) distribution['80-89']++
      else if (score.score >= 70) distribution['70-79']++
      else if (score.score >= 60) distribution['60-69']++
      else distribution['0-59']++
    })
    
    return distribution
  })

  // Actions
  function addScoreFromQuiz(quizData, userAnswers, score, timeSpent) {
    const correctAnswers = userAnswers.filter(answer => answer.correct).length
    const totalQuestions = userAnswers.length
    
    const newScore = {
      id: scores.value.length + 1,
      quizId: quizData.id,
      quizTitle: quizData.title,
      score: score,
      maxScore: totalQuestions * 10, // 10 puncte pe întrebare
      date: new Date().toISOString().split('T')[0],
      timeSpent: formatTime(timeSpent),
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions
    }
    
    scores.value.push(newScore)
    updateHighScores()
    updateUserRank()
    
    console.log(`✅ Scor adăugat: ${score}/${newScore.maxScore}`)
    return newScore
  }

  function addScore(scoreData) {
    const newScore = {
      id: scores.value.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...scoreData
    }
    
    scores.value.push(newScore)
    updateHighScores()
    updateUserRank()
    
    console.log(`➕ Scor adăugat: ${scoreData.score}/${scoreData.maxScore}`)
  }

  function removeScore(scoreId) {
    scores.value = scores.value.filter(score => score.id !== scoreId)
    console.log(`🗑️ Scor eliminat: ID ${scoreId}`)
  }

  function updateScore(scoreId, updates) {
    const index = scores.value.findIndex(score => score.id === scoreId)
    if (index !== -1) {
      scores.value[index] = { ...scores.value[index], ...updates }
      console.log(`✏️ Scor actualizat: ID ${scoreId}`)
    }
  }

  function updateHighScores() {
    highScores.value = [...scores.value]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
    
    console.log('🏆 High scores actualizate')
  }

  function updateUserRank() {
    const newRank = Math.max(1, Math.floor(Math.random() * totalUsers.value))
    userRank.value = newRank
    console.log(`📊 Rank actualizat: ${newRank}/${totalUsers.value}`)
  }

  function clearAllScores() {
    scores.value = []
    highScores.value = []
    console.log('🔄 Toate scorurile eliminate')
  }

  function calculateStatistics() {
    return {
      averageScore: getAverageScore.value,
      totalAttempts: scores.value.length,
      totalCorrect: getTotalCorrectAnswers.value,
      totalAttempted: getTotalQuestionsAttempted.value,
      accuracy: getAccuracyRate.value,
      bestScore: getBestScore.value?.score || 0,
      worstScore: getWorstScore.value?.score || 0
    }
  }

  function filterScoresByQuiz(quizId) {
    return scores.value.filter(score => score.quizId === quizId)
  }

  function filterScoresByDate(startDate, endDate) {
    return scores.value.filter(score => {
      const scoreDate = new Date(score.date)
      return scoreDate >= new Date(startDate) && scoreDate <= new Date(endDate)
    })
  }

  function exportScores() {
    const dataStr = JSON.stringify(scores.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `edubac-scores-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    console.log('💾 Scoruri exportate')
  }

  function importScores(data) {
    try {
      const importedScores = JSON.parse(data)
      scores.value = [...scores.value, ...importedScores]
      updateHighScores()
      console.log('📥 Scoruri importate cu succes')
    } catch (error) {
      console.error('❌ Eroare la importul scorurilor:', error)
    }
  }

  // Helper functions
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  function getLatestScore() {
    if (scores.value.length === 0) return null
    return scores.value[scores.value.length - 1]
  }

  function getQuizStats(quizId) {
    const quizScores = filterScoresByQuiz(quizId)
    if (quizScores.length === 0) return null
    
    const totalScore = quizScores.reduce((sum, score) => sum + score.score, 0)
    const avgScore = Math.round(totalScore / quizScores.length)
    const bestScore = Math.max(...quizScores.map(s => s.score))
    const attempts = quizScores.length
    
    return {
      quizId,
      attempts,
      averageScore: avgScore,
      bestScore,
      latestScore: quizScores[quizScores.length - 1].score
    }
  }

  return {
    // State
    scores,
    highScores,
    userRank,
    totalUsers,
    
    // Getters
    getAllScores,
    getHighScores,
    getUserRank,
    getTotalUsers,
    getAverageScore,
    getTotalCorrectAnswers,
    getTotalQuestionsAttempted,
    getAccuracyRate,
    getBestScore,
    getWorstScore,
    getScoreDistribution,
    
    // Actions
    addScoreFromQuiz,
    addScore,
    removeScore,
    updateScore,
    updateHighScores,
    updateUserRank,
    clearAllScores,
    calculateStatistics,
    filterScoresByQuiz,
    filterScoresByDate,
    exportScores,
    importScores,
    getLatestScore,
    getQuizStats
  }
})