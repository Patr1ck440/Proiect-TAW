<template>
  <div class="chapter-list">
    <h3>Capitole disponibile:</h3>
    <ul>
      <li v-for="(chapter, index) in chapters" :key="index">
        <button @click="$emit('select-chapter', index)">
          {{ chapter.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  chapters: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>

</style>
