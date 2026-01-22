<template>
  <div>
    <h1>Capitole</h1>

    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <router-link :to="`/capitole/${chapter.id}`">
          {{ chapter.title }} – {{ chapter.subject }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChapterStore } from '@/stores/chapterStore'

const chapterStore = useChapterStore()
const chapters = chapterStore.getAllChapters
</script>