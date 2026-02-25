<template>
  <div class="profile-overview">
    <h3 class="text-xl font-semibold mb-4">🎯 Overview</h3>
    <div class="space-y-4">
      <p>Bine ai revenit, {{ userName }}! Ai progresat bine în ultima perioadă.</p>
      <!-- Poți adăuga mai multe statistici aici -->
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const userName = userStore.getUserName
</script>