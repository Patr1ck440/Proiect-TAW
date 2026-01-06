<template>
  <div>
    <ChapterPage v-if="!chapter" />
    <ChapterTitle v-else :title="chapter.title" />
    <p>Întrebarea curentă: {{ currentQuestion?.question }}</p>
    <!-- restul quiz-ului ca în QuizPage.vue -->
  </div>
</template>




<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
 import ChapterTitle from '@/components/ChapterTitle.vue'





const route = useRoute()
const chapterIndex = Number(route.params.id)

const chapters = ref([
  { title: 'Capitolul 1: Variabile', questions: [{ question: "Ce este o variabilă?", answer: "un spațiu de stocare" },{ question: "Ce tip de variabilă stochează numere întregi?", answer: "integer"}]},
  { title: 'Capitolul 2: Bucla for', questions: [{ question: "Cum începe o buclă for?", answer: "for(" },{ question: "Ce face break?", answer: "oprește bucla" }]}
])

const chapter = computed(() => chapters.value[chapterIndex])
const currentQuestion = ref(chapter.value.questions[0])
</script>
