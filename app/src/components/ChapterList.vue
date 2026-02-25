<template>
  <div class="chapter-list">
    <h3>Capitole disponibile:</h3>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <button @click="$emit('select-chapter', chapter.id)">
          {{ chapter.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  chapters: Array
})
</script>