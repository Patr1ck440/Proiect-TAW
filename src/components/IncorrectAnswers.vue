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
.incorrect-answers {
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  background-color: #f8d7da;
  color: #721c24;
}
</style>
