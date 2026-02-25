<template>
  <div class="profile-page p-4 md:p-6 min-h-screen bg-gradient-to-b from-teal-600 to-blue-700 text-white">
    
    <!-- Header cu navigare înapoi -->
    <div class="header-section mb-8 flex justify-between items-center">
      <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span>Înapoi</span>
      </router-link>
      
      <h1 class="text-2xl md:text-3xl font-bold">Profilul meu</h1>
      
      <button @click="logoutUser" class="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span class="hidden md:inline">Delogare</span>
      </button>
    </div>

    <!-- Componenta UserProfile cu date din store -->
    <div class="max-w-6xl mx-auto">
      <UserProfile
        :name="userName"
        :avatar="userAvatar"
        :level="userLevel"
        :points="userPoints"
        :streak="userStreak"
        :rank="userRank"
        :progress="levelProgress"
        :badges="userBadges"
        class="mb-8"
      />

      <!-- Statistici rapide -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm opacity-80">Răspunsuri corecte</p>
              <p class="text-2xl font-bold">{{ correctCount }}/{{ totalAnswers }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm opacity-80">Capitole completate</p>
              <p class="text-2xl font-bold">{{ completedChapters }}/{{ totalChapters }}</p>
            </div>
          </div>
        </div>
        
        <div class="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm opacity-80">Zile consecutive</p>
              <p class="text-2xl font-bold">{{ userStreak }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigare profil -->
      <div class="profile-nav mb-8">
        <div class="flex flex-wrap gap-2 mb-6">
          <router-link to="/profil" 
                       class="px-4 py-2 rounded-lg transition"
                       :class="$route.path === '/profil' 
                         ? 'bg-white text-teal-700' 
                         : 'bg-white/10 hover:bg-white/20'">
            📊 Overview
          </router-link>
          <router-link to="/profil/statistici" 
                       class="px-4 py-2 rounded-lg transition"
                       :class="$route.path.includes('/profil/statistici') 
                         ? 'bg-white text-teal-700' 
                         : 'bg-white/10 hover:bg-white/20'">
            📈 Statistici
          </router-link>
          <router-link to="/profil/premii" 
                       class="px-4 py-2 rounded-lg transition"
                       :class="$route.path.includes('/profil/premii') 
                         ? 'bg-white text-teal-700' 
                         : 'bg-white/10 hover:bg-white/20'">
            🏆 Premii
          </router-link>
          <router-link to="/profil/setari" 
                       class="px-4 py-2 rounded-lg transition"
                       :class="$route.path.includes('/profil/setari') 
                         ? 'bg-white text-teal-700' 
                         : 'bg-white/10 hover:bg-white/20'">
            ⚙️ Setări
          </router-link>
        </div>
      </div>

      <!-- Conținut dinamic (router view) -->
      <div class="content-section">
        <RouterView />
      </div>

      <!-- Acțiuni rapide -->
      <div class="quick-actions mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button @click="addTestPoints" 
                class="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:from-green-600 hover:to-emerald-700 transition flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Adaugă 50 puncte (test)
        </button>
        
        <button @click="updateStreak" 
                class="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Actualizează streak
        </button>
        
        <button @click="addTestBadge" 
                class="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl hover:from-purple-600 hover:to-pink-700 transition flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          Adaugă badge (test)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useQuizStore } from '../stores/quizStore'
import UserProfile from '@/components/UserProfile.vue'

// 🔥 PINIA STORES
const userStore = useUserStore()
const quizStore = useQuizStore()

// ===== COMPUTED PROPERTIES =====
const userName = computed(() => userStore.getUserName)
const userAvatar = computed(() => userStore.getUserAvatar)
const userLevel = computed(() => userStore.getUserLevel)
const userPoints = computed(() => userStore.getUserPoints)
const userStreak = computed(() => userStore.getUserStreak)
const userRank = computed(() => userStore.getUserRank)
const userBadges = computed(() => userStore.getUserBadges)
const levelProgress = computed(() => userStore.getLevelProgress)

// Statistici din quiz store
const completedChapters = computed(() => quizStore.getCompletedCount)
const totalChapters = computed(() => quizStore.getQuizCount)
const correctCount = computed(() => {
  const userAnswers = quizStore.userAnswers
  return userAnswers.filter(answer => answer.correct).length
})
const totalAnswers = computed(() => quizStore.userAnswers.length)

// ===== METHODS =====
function logoutUser() {
  if (confirm('Sigur vrei să te deloghezi?')) {
    userStore.logout()
    // Redirectează la pagina de login sau acasă
    window.location.href = '/'
  }
}

function addTestPoints() {
  userStore.addPoints(50)
  showToast('🎉 50 puncte adăugate!', 'success')
}

function updateStreak() {
  userStore.updateStreak()
  showToast('📅 Streak actualizat!', 'info')
}

function addTestBadge() {
  const badgeName = `achiever-${Date.now().toString().slice(-3)}`
  userStore.addBadge(badgeName)
  showToast(`🏆 Badge "${badgeName}" adăugat!`, 'success')
}

function showToast(message, type = 'info') {
  // Implementare simplă - poți înlocui cu componenta ta
  const toast = document.createElement('div')
  toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white ${
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}

// Initialize on mount
onMounted(() => {
  // Actualizează streak la încărcarea paginii
  userStore.updateStreak()
})
</script>

<style scoped>
/* ===== PROFILE PAGE SPECIFIC CSS ===== */

/* Container principal */
.profile-page {
  min-height: 100vh;
  background: linear-gradient(135deg, darkcyan 0%, aquamarine 100%);
  color: white;
  padding: 1rem;
}

/* Header section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

/* Back button */
.header-section a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.header-section a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

/* Main container */
.profile-page > .max-w-6xl {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Stat cards */
.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

/* Icon containers in stat cards */
.stat-card .w-12.h-12 {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Grid for stat cards */
.grid-cols-1.md\:grid-cols-3 {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid-cols-1.md\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Profile navigation */
.profile-nav .flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.profile-nav button,
.profile-nav a {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

/* Quick actions buttons */
.quick-actions {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .quick-actions {
    grid-template-columns: repeat(3, 1fr);
  }
}

.quick-actions button {
  padding: 1rem;
  border-radius: 12px;
  border: none;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.quick-actions button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Content section */
.content-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

/* UserProfile component fixes */
.user-profile {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
}

/* Avatar fixes */
.user-profile img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .user-profile img {
    width: 6rem;
    height: 6rem;
  }
}

/* Level indicator */
.user-profile .absolute {
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

/* Progress bar */
.user-profile .w-full.bg-white\/20 {
  background: rgba(255, 255, 255, 0.2);
  height: 0.75rem;
  border-radius: 9999px;
  overflow: hidden;
}

.user-profile .h-3.rounded-full {
  height: 0.75rem;
  border-radius: 9999px;
  transition: width 1s ease-in-out;
}

/* Badges section */
.user-profile .flex-wrap.gap-3 {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  width: 5.5rem;
  text-align: center;
}

.badge-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.badge-item .w-12.h-12 {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Statistics grid */
.grid-cols-2.md\:grid-cols-4 {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Logout button */
.bg-red-500\/20 {
  background: rgba(239, 68, 68, 0.2);
}

.bg-red-500\/20:hover {
  background: rgba(239, 68, 68, 0.3);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .profile-page {
    padding: 0.5rem;
  }
  
  .header-section {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .header-section h1 {
    order: -1;
  }
  
  .quick-actions button {
    font-size: 0.8rem;
    padding: 0.75rem;
  }
  
  .user-profile {
    padding: 1rem;
  }
}

/* Animation for fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-page > * {
  animation: fadeIn 0.5s ease-out;
}

/* Scrollbar styling for profile page */
.profile-page::-webkit-scrollbar {
  width: 8px;
}

.profile-page::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.profile-page::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.profile-page::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>