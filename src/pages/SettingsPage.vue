<template>
  <div class="settings-page p-6">
    <h1 class="text-2xl font-bold mb-4">Setări</h1>

    <ul class="mb-4">
      <li>
        <router-link to="/setari/font">Schimbă fontul</router-link>
      </li>
      <li>
        <router-link to="/setari/tema">Schimbă tema</router-link>
      </li>
    </ul>

    <!-- 🔴 OBLIGATORIU -->
    <router-view />
  </div>
</template>
