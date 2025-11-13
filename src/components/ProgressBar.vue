<template>
  <div class="progress-wrapper">
    <div class="progress-info">
      <span>Întrebarea {{ current + 1 }} din {{ total }}</span>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const progressPercent = computed(() =>
  props.total > 0 ? ((props.current + 1) / props.total) * 100 : 0
)
</script>

<style scoped>

</style>
