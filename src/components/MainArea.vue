<template>
  <div class="main-area">
    <!-- Titlul capitolului -->
    <ChapterTitle :title="currentChapter.title" />

    <!-- Întrebarea curentă -->
    <QuestionDisplay :question="currentQuestion.question" />

    <!-- Input pentru răspuns -->
    <AnswerInput @send-answer="submitAnswer" />

    <!-- Feedback vizibil după trimitere -->
    <FeedbackMessage v-if="feedback" :message="feedback" :status="feedbackStatus" />

    <!-- Buton pentru următoarea întrebare -->
    <button v-if="feedback && !chapterFinished" @click="nextQuestion" class="next-btn">
      Următoarea întrebare
    </button>

    <!-- Controls când capitolul s-a terminat -->
    <ChapterControls v-if="chapterFinished"
      @restart="restartChapter"
      @show-incorrect="showIncorrect"
      @next="nextChapter" />

    <!-- Lista cu răspunsuri greșite -->
    <IncorrectAnswers v-if="showIncorrectList" :answers="userAnswers.filter(a => !a.correct)" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChapterTitle from './ChapterTitle.vue'
import QuestionDisplay from './QuestionDisplay.vue'
import AnswerInput from './AnswerInput.vue'
import FeedbackMessage from './FeedbackMessage.vue'
import ChapterControls from './ChapterControls.vue'
import IncorrectAnswers from './IncorrectAnswers.vue'

// ===== Structura capitole și întrebări =====
const chapters = [
  {
    title: "Capitolul 1: Variabile",
    questions: [
      { question: "Ce este o variabilă?", answer: "un spațiu de stocare" },
      { question: "Ce tip de variabilă stochează numere întregi?", answer: "integer" }
    ]
  },
  {
    title: "Capitolul 2: Bucla for",
    questions: [
      { question: "Cum începe o buclă for în C++?", answer: "for(" },
      { question: "Ce face break?", answer: "oprește bucla" }
    ]
  }
]

// ===== State reactiv =====
const currentChapterIndex = ref(0)
const currentQuestionIndex = ref(0)
const userAnswers = ref([]) // toate răspunsurile date {question, userAnswer, correct}
const feedback = ref('')
const feedbackStatus = ref('') // "correct" sau "wrong"
const showIncorrectList = ref(false)

// ===== Computed =====
const currentChapter = computed(() => chapters[currentChapterIndex.value])
const currentQuestion = computed(() => currentChapter.value.questions[currentQuestionIndex.value])
const chapterFinished = computed(() => currentQuestionIndex.value >= currentChapter.value.questions.length)

// ===== Funcții =====
function submitAnswer(answer) {
  if(feedback.value) return // previne trimiterea mai multor răspunsuri la aceeași întrebare

  const correct = answer.trim().toLowerCase() === currentQuestion.value.answer.trim().toLowerCase()
  feedback.value = correct ? 'Corect! ✅' : `Greșit ❌ Răspuns corect: ${currentQuestion.value.answer}`
  feedbackStatus.value = correct ? 'correct' : 'wrong'

  userAnswers.value.push({
    question: currentQuestion.value.question,
    userAnswer: answer,
    correct
  })
}

function nextQuestion() {
  feedback.value = ''
  feedbackStatus.value = ''
  currentQuestionIndex.value++
}

function nextChapter() {
  currentChapterIndex.value++
  restartChapter()
}

function restartChapter() {
  currentQuestionIndex.value = 0
  feedback.value = ''
  feedbackStatus.value = ''
  userAnswers.value = []
  showIncorrectList.value = false
}

function showIncorrect() {
  showIncorrectList.value = true
}
</script>

<style scoped>
.main-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.next-btn {
  align-self: flex-end;
  background-color: darkcyan;
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.next-btn:hover {
  background-color: #009999;
  transform: translateY(-1px);
}

.next-btn:active {
  background-color: #008080;
  transform: translateY(0);
}
</style>
