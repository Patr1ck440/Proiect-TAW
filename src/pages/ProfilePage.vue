<template>
  <div class="profile-page p-6 flex flex-col items-center min-h-[70vh] bg-teal-600 text-white">
    
    <!-- UserProfile -->
    <UserProfile
      name="Patrick Pușcaș"
      avatar="https://i.pravatar.cc/70"
      :chaptersCompleted="currentChapterIndex"
      :totalChapters="chapters.length"
      :correctAnswers="correctCount"
      :totalAnswers="userAnswers.length"
      class="mb-6 w-full max-w-md"
    />

    <!-- Butoane pentru navigarea la scor/rezultat -->
    <div class="flex gap-4 mb-6">
      <router-link
        to="/profil/scor"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Vezi Scorul
      </router-link>
      <router-link
        to="/profil/rezultat"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Vezi Rezultatele
      </router-link>
    </div>

    <!-- Aici se vor încărca paginile copil -->
    <RouterView class="w-full max-w-2xl" />
  </div>
</template>

<script setup>
import UserProfile from '@/components/UserProfile.vue'
import { ref } from 'vue'

// date demo
const currentChapterIndex = ref(1)
const chapters = ref([
  { title: 'Capitolul 1: Variabile' },
  { title: 'Capitolul 2: Bucla for' },
])
const correctCount = ref(3)
const userAnswers = ref([
  { question: 'Ce este o variabilă?', userAnswer: 'Spațiu de stocare', correct: true },
  { question: 'Tip variabilă integer?', userAnswer: 'int', correct: true },
])
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
}
</style>
