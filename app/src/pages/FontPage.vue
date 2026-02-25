<template>
  <div class="font-page p-6">
    <h1 class="text-2xl font-bold mb-4">Font Settings</h1>

    <FontChanger :selected-font="selectedFont" @change-font="updateFont" />
  </div>
</template>

<script setup>
import FontChanger from '@/components/FontChanger.vue'
defineProps(['selectedFont', 'updateFont'])
</script>
