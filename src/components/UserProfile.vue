<template>
  <div class="user-profile">
   
    <div class="info">
      <h3>{{ name }}</h3>
      <p>Capitole completate: {{ chaptersCompleted }} / {{ totalChapters }}</p>
      <p>Răspunsuri corecte: {{ correctAnswers }} / {{ totalAnswers }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'Student'
  },
  avatar: {
    type: String,
    default: '' 
  },
  chaptersCompleted: {
    type: Number,
    default: 0
  },
  totalChapters: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  totalAnswers: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>

</style>
