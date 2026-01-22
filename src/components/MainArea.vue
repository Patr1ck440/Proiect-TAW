<script setup>
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quizStore'

// componente
import AlertBox from './AlertBox.vue'
import UserProfile from './UserProfile.vue'
import ThemeToggle from './ThemeToggle.vue'
import ChapterList from './ChapterList.vue'
import ChapterTitle from './ChapterTitle.vue'
import ProgressBar from './ProgressBar.vue'
import QuestionDisplay from './QuestionDisplay.vue'
import AnswerInput from './AnswerInput.vue'
import FeedbackMessage from './FeedbackMessage.vue'
import ChapterControls from './ChapterControls.vue'
import IncorrectAnswers from './IncorrectAnswers.vue'
import ScoreBoard from './ScoreBoard.vue'

// 🔥 PINIA
const quizStore = useQuizStore()

const isDark = ref(false)
const showIncorrectList = ref(false)
const alertMessage = ref('')
const alertType = ref('info')

// ===== COMPUTED =====
const chapters = computed(() => quizStore.getAllQuizzes)
const currentQuiz = computed(() => quizStore.getCurrentQuiz)
const currentQuestion = computed(() => quizStore.getCurrentQuestion)

const currentQuestionIndex = computed(() => quizStore.currentQuestionIndex)
const totalQuestions = computed(() =>
  currentQuiz.value?.questions?.length || 0
)

const chapterStarted = computed(() => quizStore.quizStarted)
const chapterFinished = computed(() => quizStore.quizCompleted)

const userAnswers = computed(() => quizStore.userAnswers)
const incorrectAnswers = computed(() =>
  quizStore.userAnswers.filter(a => !a.correct)
)
const correctCount = computed(() =>
  quizStore.userAnswers.filter(a => a.correct).length
)

// ===== METHODS =====
function handleToggleTheme() {
  isDark.value = !isDark.value
}

function selectChapter(index) {
  const quiz = chapters.value[index]
  if (quiz) quizStore.startQuiz(quiz.id)
}

function submitAnswer(answer) {
  quizStore.submitAnswer(answer)
}

function nextQuestion() {
  quizStore.nextQuestion()
}

function restartChapter() {
  quizStore.resetQuiz()
  showIncorrectList.value = false
}

function showIncorrect() {
  showIncorrectList.value = true
}

function nextChapter() {
  alertMessage.value = 'Ai terminat toate capitolele!'
  alertType.value = 'success'
}
</script>
