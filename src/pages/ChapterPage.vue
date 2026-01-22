<template>
  <div v-if="chapter">
    <ChapterTitle :title="chapter.title" />

    <p>Materie: {{ chapter.subject }}</p>
    <p>Dificultate: {{ chapter.difficulty }}</p>
    <p>Descriere: {{ chapter.description }}</p>
    <p>Progres: {{ chapter.progress }}%</p>
    <p>Întrebări totale: {{ chapter.questions }}</p>
    <p>Durată estimată: {{ chapter.duration }}</p>
  </div>

  <div v-else>
    <p>Capitolul nu există.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useChapterStore } from '@/stores/chapterStore'
import ChapterTitle from '@/components/ChapterTitle.vue'

const route = useRoute()
const chapterStore = useChapterStore()

const chapterId = Number(route.params.id)

const chapter = computed(() =>
  chapterStore.chapters.find(ch => ch.id === chapterId)
)
</script>