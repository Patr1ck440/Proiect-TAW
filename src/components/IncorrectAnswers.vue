<template>
  <div class="incorrect-answers">
    <h3>Răspunsuri greșite:</h3>
    <ul>
      <li v-for="(item, index) in answers" :key="index">
        {{ item.question }} → {{ item.userAnswer }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  answers: Array
})
</script>

<style scoped>

</style>
