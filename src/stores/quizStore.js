import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  // State
  const currentQuiz = ref(null)
  const quizzes = ref([
    {
      id: 1,
      title: 'Capitolul 1: Variabile',
      questions: [
        { question: 'Ce este o variabilă?', answer: 'un spațiu de stocare' },
        { question: 'Ce tip de variabilă stochează numere întregi?', answer: 'integer' }
      ],
      completed: false,
      score: 0
    },
    {
      id: 2,
      title: 'Capitolul 2: Funcții',
      questions: [
        { question: 'Ce este o funcție?', answer: 'un bloc de cod reutilizabil' },
        { question: 'Ce returnează o funcție void?', answer: 'nimic' }
      ],
      completed: false,
      score: 0
    }
  ])
  
  const currentQuestionIndex = ref(0)
  const userAnswers = ref([])
  const quizTimer = ref(0)
  const quizStarted = ref(false)
  const quizCompleted = ref(false)
  const score = ref(0)

  // Getters
  const getCurrentQuiz = computed(() => currentQuiz.value)
  const getAllQuizzes = computed(() => quizzes.value)
  const getCompletedQuizzes = computed(() => 
    quizzes.value.filter(quiz => quiz.completed)
  )
  const getIncompleteQuizzes = computed(() => 
    quizzes.value.filter(quiz => !quiz.completed)
  )
  const getQuizCount = computed(() => quizzes.value.length)
  const getCompletedCount = computed(() => 
    quizzes.value.filter(quiz => quiz.completed).length
  )
  const getProgressPercentage = computed(() => {
    if (quizzes.value.length === 0) return 0
    return (getCompletedCount.value / quizzes.value.length) * 100
  })
  const getAverageScore = computed(() => {
    const completed = quizzes.value.filter(q => q.completed)
    if (completed.length === 0) return 0
    return completed.reduce((sum, q) => sum + q.score, 0) / completed.length
  })
  const getCurrentQuestion = computed(() => {
    if (!currentQuiz.value || !currentQuiz.value.questions) return null
    return currentQuiz.value.questions[currentQuestionIndex.value]
  })
  const getQuizProgress = computed(() => {
    if (!currentQuiz.value || !currentQuiz.value.questions) return 0
    return ((currentQuestionIndex.value + 1) / currentQuiz.value.questions.length) * 100
  })

  // Actions
  function startQuiz(quizId) {
    const quiz = quizzes.value.find(q => q.id === quizId)
    if (quiz) {
      currentQuiz.value = quiz
      currentQuestionIndex.value = 0
      userAnswers.value = []
      quizStarted.value = true
      quizCompleted.value = false
      score.value = 0
      quizTimer.value = 0
      console.log(`✅ Început quiz: ${quiz.title}`)
    }
  }

  function submitAnswer(answer) {
    if (!currentQuiz.value || !currentQuiz.value.questions) return
    
    const currentQuestion = currentQuiz.value.questions[currentQuestionIndex.value]
    const isCorrect = answer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()
    
    userAnswers.value.push({
      questionIndex: currentQuestionIndex.value,
      question: currentQuestion.question,
      userAnswer: answer,
      correct: isCorrect,
      timestamp: Date.now()
    })
    
    if (isCorrect) {
      score.value += 10
    }
    
    // Nu apelăm nextQuestion automat - lasăm utilizatorul să apese butonul
    return isCorrect
  }

  function nextQuestion() {
    if (!currentQuiz.value || !currentQuiz.value.questions) return
    
    if (currentQuestionIndex.value < currentQuiz.value.questions.length - 1) {
      currentQuestionIndex.value++
    } else {
      finishQuiz()
    }
  }

  function finishQuiz() {
    if (!currentQuiz.value) return
    
    quizCompleted.value = true
    quizStarted.value = false
    
    // Salvare rezultat în quiz
    const quizIndex = quizzes.value.findIndex(q => q.id === currentQuiz.value.id)
    if (quizIndex !== -1) {
      quizzes.value[quizIndex].completed = true
      quizzes.value[quizIndex].score = score.value
    }
    
    console.log(`🎉 Quiz terminat! Scor: ${score.value}`)
  }

  function resetQuiz() {
    currentQuiz.value = null
    currentQuestionIndex.value = 0
    userAnswers.value = []
    quizStarted.value = false
    quizCompleted.value = false
    score.value = 0
    console.log('🔄 Quiz resetat')
  }

  function addQuiz(quiz) {
    quizzes.value.push({
      id: quizzes.value.length + 1,
      ...quiz,
      completed: false,
      score: 0
    })
    console.log(`➕ Quiz adăugat: ${quiz.title}`)
  }

  function removeQuiz(quizId) {
    quizzes.value = quizzes.value.filter(q => q.id !== quizId)
    console.log(`🗑️ Quiz eliminat: ID ${quizId}`)
  }

  function updateQuiz(quizId, updates) {
    const index = quizzes.value.findIndex(q => q.id === quizId)
    if (index !== -1) {
      quizzes.value[index] = { ...quizzes.value[index], ...updates }
      console.log(`✏️ Quiz actualizat: ${quizzes.value[index].title}`)
    }
  }

  function resetAllQuizzes() {
    quizzes.value.forEach(quiz => {
      quiz.completed = false
      quiz.score = 0
    })
    console.log('🔄 Toate quiz-urile resetate')
  }

  function startTimer() {
    quizTimer.value = 0
    const timer = setInterval(() => {
      if (quizStarted.value && !quizCompleted.value) {
        quizTimer.value++
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  return {
    // State
    currentQuiz,
    quizzes,
    currentQuestionIndex,
    userAnswers,
    quizTimer,
    quizStarted,
    quizCompleted,
    score,
    
    // Getters
    getCurrentQuiz,
    getAllQuizzes,
    getCompletedQuizzes,
    getIncompleteQuizzes,
    getQuizCount,
    getCompletedCount,
    getProgressPercentage,
    getAverageScore,
    getCurrentQuestion,
    getQuizProgress,
    
    // Actions
    startQuiz,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    resetQuiz,
    addQuiz,
    removeQuiz,
    updateQuiz,
    resetAllQuizzes,
    startTimer
  }
})