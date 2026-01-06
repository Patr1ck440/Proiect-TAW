<template>
  <div>
    <h1>Capitole</h1>
    <ul>
      <li v-for="(chapter, index) in chapters" :key="index">
        <router-link :to="`/capitole/${index}`">{{ chapter.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chapters = ref([
  { title: 'Capitolul 1: Variabile' },
  { title: 'Capitolul 2: Bucla for' }
])
</script>
