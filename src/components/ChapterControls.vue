<template>
  <div class="controls">
    <button @click="$emit('next')">Următorul test</button>
    <button @click="$emit('restart')">Reia testul</button>
    <button @click="$emit('show-incorrect')">Vezi greșelile</button>
  </div>
</template>

<script setup>
defineEmits(['next','restart','show-incorrect'])
</script>

<style scoped>
.controls {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.controls button {
  background-color: darkcyan;
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.controls button:hover {
  background-color: #009999;
  transform: translateY(-1px);
}

.controls button:active {
  background-color: #008080;
  transform: translateY(0);
}
</style>
