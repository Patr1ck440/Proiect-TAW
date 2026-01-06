<template>
  <div class="font-changer p-4">
    <label for="font-select" class="block mb-2 font-semibold">Alege un font:</label>
    <select id="font-select" v-model="localFont" class="border p-2 rounded">
      <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
    </select>

    <p class="mt-4" :style="{ fontFamily: localFont }">
      Acesta este un preview al fontului: {{ localFont }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedFont: String
})
const emit = defineEmits(['change-font'])

const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Roboto', 'Verdana']
const localFont = ref(props.selectedFont)

// watch pentru a emite schimbarea la App.vue
watch(localFont, (newFont) => {
  emit('change-font', newFont)
})
</script>
