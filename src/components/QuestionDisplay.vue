<template>
  <div class="question-box">
    <h2 v-if="question">{{ question }}</h2>
    <div v-else class="no-question">
      <h2>— Nu mai sunt întrebări în acest capitol —</h2>
      <p>Apasă „Vezi greșelile” sau „Reia testul”.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>

</style>
