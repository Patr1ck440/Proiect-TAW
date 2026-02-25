<template>
  <div class="scoreboard">
    <h3>Rezultatele tale</h3>
    <div class="scores">
      <p class="correct">Corecte: {{ correct }}</p>
      <p class="wrong">Greșite: {{ wrong }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  correct: Number,
  wrong: Number
})
</script>

<style scoped>

</style>
