import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChapterStore = defineStore('chapter', () => {
  // State
  const chapters = ref([
    {
      id: 1,
      title: 'Algebră',
      subject: 'Matematică',
      difficulty: 'mediu',
      description: 'Noțiuni de bază de algebră',
      completed: false,
      progress: 30,
      questions: 15,
      duration: '2 ore'
    },
    {
      id: 2,
      title: 'Geometrie',
      subject: 'Matematică',
      difficulty: 'dificil',
      description: 'Geometrie plană și în spațiu',
      completed: false,
      progress: 10,
      questions: 20,
      duration: '3 ore'
    },
    {
      id: 3,
      title: 'Literatură Română',
      subject: 'Română',
      difficulty: 'ușor',
      description: 'Autori și opere clasice',
      completed: true,
      progress: 100,
      questions: 12,
      duration: '1.5 ore'
    },
    {
      id: 4,
      title: 'Literatură Română',
      subject: 'Română',
      difficulty: 'ușor',
      description: 'Autori și opere clasice',
      completed: true,
      progress: 100,
      questions: 12,
      duration: '1.5 ore'
    },
    {
      id: 5,
      title: 'Literatură Română',
      subject: 'Română',
      difficulty: 'ușor',
      description: 'Autori și opere clasice',
      completed: true,
      progress: 100,
      questions: 12,
      duration: '1.5 ore'
    }
  ])

  const currentChapter = ref(null)
  const selectedSubject = ref('all')

  // Getters
  const getAllChapters = computed(() => chapters.value)
  const getCompletedChapters = computed(() => 
    chapters.value.filter(chapter => chapter.completed)
  )
  const getIncompleteChapters = computed(() => 
    chapters.value.filter(chapter => !chapter.completed)
  )
  const getChapterCount = computed(() => chapters.value.length)
  const getCompletedCount = computed(() => 
    chapters.value.filter(chapter => chapter.completed).length
  )
  const getProgressPercentage = computed(() => {
    if (chapters.value.length === 0) return 0
    const totalProgress = chapters.value.reduce((sum, ch) => sum + ch.progress, 0)
    return totalProgress / chapters.value.length
  })
  const getChaptersBySubject = computed(() => {
    if (selectedSubject.value === 'all') return chapters.value
    return chapters.value.filter(ch => ch.subject === selectedSubject.value)
  })
  const getSubjects = computed(() => {
    const subjects = chapters.value.map(ch => ch.subject)
    return ['all', ...new Set(subjects)]
  })
  const getCurrentChapter = computed(() => currentChapter.value)
  const getChaptersByDifficulty = (difficulty) => {
    return computed(() => chapters.value.filter(ch => ch.difficulty === difficulty))
  }

  // Actions
  function selectChapter(chapterId) {
    const chapter = chapters.value.find(ch => ch.id === chapterId)
    if (chapter) {
      currentChapter.value = chapter
      console.log(` Capitol selectat: ${chapter.title}`)
    }
  }

  function markChapterAsCompleted(chapterId) {
    const chapter = chapters.value.find(ch => ch.id === chapterId)
    if (chapter) {
      chapter.completed = true
      chapter.progress = 100
      console.log(` Capitol completat: ${chapter.title}`)
    }
  }

  function updateChapterProgress(chapterId, progress) {
    const chapter = chapters.value.find(ch => ch.id === chapterId)
    if (chapter) {
      chapter.progress = Math.min(100, Math.max(0, progress))
      if (chapter.progress === 100) {
        chapter.completed = true
      }
      console.log(` Progres capitol ${chapter.title}: ${chapter.progress}%`)
    }
  }

  function addChapter(chapter) {
    chapters.value.push({
      id: chapters.value.length + 1,
      ...chapter,
      completed: false,
      progress: 0
    })
    console.log(` Capitol adăugat: ${chapter.title}`)
  }

  function removeChapter(chapterId) {
    chapters.value = chapters.value.filter(ch => ch.id !== chapterId)
    console.log(` Capitol eliminat: ID ${chapterId}`)
  }

  function updateChapter(chapterId, updates) {
    const index = chapters.value.findIndex(ch => ch.id === chapterId)
    if (index !== -1) {
      chapters.value[index] = { ...chapters.value[index], ...updates }
      console.log(` Capitol actualizat: ${chapters.value[index].title}`)
    }
  }

  function filterBySubject(subject) {
    selectedSubject.value = subject
    console.log(` Filtrat după materie: ${subject}`)
  }

  function resetChapterProgress(chapterId) {
    const chapter = chapters.value.find(ch => ch.id === chapterId)
    if (chapter) {
      chapter.completed = false
      chapter.progress = 0
      console.log(` Progres resetat pentru capitol: ${chapter.title}`)
    }
  }

  function resetAllProgress() {
    chapters.value.forEach(chapter => {
      chapter.completed = false
      chapter.progress = 0
    })
    console.log(' Progresul tuturor capitoarelor resetat')
  }

  function sortChaptersBy(property) {
    chapters.value.sort((a, b) => {
      if (property === 'title') {
        return a.title.localeCompare(b.title)
      } else if (property === 'difficulty') {
        const difficultyOrder = { 'ușor': 1, 'mediu': 2, 'dificil': 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      } else if (property === 'progress') {
        return b.progress - a.progress
      }
      return 0
    })
    console.log(` Capitole sortate după: ${property}`)
  }

  return {
    // State
    chapters,
    currentChapter,
    selectedSubject,
    
    // Getters
    getAllChapters,
    getCompletedChapters,
    getIncompleteChapters,
    getChapterCount,
    getCompletedCount,
    getProgressPercentage,
    getChaptersBySubject,
    getSubjects,
    getCurrentChapter,
    getChaptersByDifficulty,
    
    // Actions
    selectChapter,
    markChapterAsCompleted,
    updateChapterProgress,
    addChapter,
    removeChapter,
    updateChapter,
    filterBySubject,
    resetChapterProgress,
    resetAllProgress,
    sortChaptersBy
  }
})