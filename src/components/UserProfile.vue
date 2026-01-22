<template>
  <div class="user-profile">
    <!-- Layout VERTICAL (portret) -->
    <div class="profile-header">
      <!-- Avatar și nivel -->
      <div class="avatar-section">
        <div class="relative">
          <img :src="avatar || 'https://i.pravatar.cc/150'" 
               :alt="name"
               class="avatar-image">
          
          <!-- Level indicator -->
          <div class="level-badge">
            {{ level }}
          </div>
        </div>
        
        <!-- Nume și rank -->
        <div class="user-info">
          <h2 class="user-name">{{ name }}</h2>
          <div class="user-rank">
            <span class="rank-badge">🏆 {{ rank }}</span>
            <span class="points-badge">⭐ {{ points }} puncte</span>
            <span class="streak-badge" v-if="streak > 0">🔥 {{ streak }} zile</span>
          </div>
        </div>
      </div>

      <!-- Progres nivel -->
      <div class="progress-section">
        <div class="progress-header">
          <span class="progress-label">Progres nivel {{ level }}</span>
          <span class="progress-percentage">{{ Math.round(progress) }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Statistici (opțional) -->
    <div v-if="showExtraStats" class="stats-grid">
      <div class="stat-item">
        <p class="stat-value">{{ chaptersCompleted || 0 }}</p>
        <p class="stat-label">Capitole</p>
      </div>
      <div class="stat-item">
        <p class="stat-value">{{ correctAnswers || 0 }}</p>
        <p class="stat-label">Corecte</p>
      </div>
      <div class="stat-item">
        <p class="stat-value" :class="calculateAccuracy() >= 70 ? 'good' : 'average'">
          {{ calculateAccuracy() }}%
        </p>
        <p class="stat-label">Acuratețe</p>
      </div>
      <div class="stat-item">
        <p class="stat-value">{{ totalAnswers || 0 }}</p>
        <p class="stat-label">Întrebări</p>
      </div>
    </div>

    <!-- Badges/achievements -->
    <div v-if="badges && badges.length > 0" class="badges-section">
      <h3 class="section-title">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
        Premii obținute
      </h3>
      <div class="badges-grid">
        <div v-for="(badge, index) in badges.slice(0, 8)" :key="index"
             class="badge-item"
             :title="formatBadgeName(badge)">
          <div class="badge-icon" :class="getBadgeColor(badge)">
            {{ getBadgeEmoji(badge) }}
          </div>
          <p class="badge-name">{{ formatBadgeName(badge) }}</p>
        </div>
        
        <!-- Badge counter dacă sunt mai multe -->
        <div v-if="badges.length > 8" 
             class="badge-item more-badges">
          <div class="badge-icon">
            <span class="text-2xl">+{{ badges.length - 8 }}</span>
          </div>
          <p class="badge-name">mai multe</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: 'Student'
  },
  avatar: {
    type: String,
    default: ''
  },
  level: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    default: 'Începător'
  },
  progress: {
    type: Number,
    default: 0
  },
  badges: {
    type: Array,
    default: () => []
  },
  chaptersCompleted: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  totalAnswers: {
    type: Number,
    default: 0
  },
  showExtraStats: {
    type: Boolean,
    default: true
  }
})

// ===== METHODS =====
function formatBadgeName(badge) {
  const badgeMap = {
    'beginner': 'Începător',
    'quiz-master': 'Maestru Quiz',
    'fast-learner': 'Învățător Rapid',
    'streak-king': 'Regele Streak-urilor',
    'perfect-score': 'Scor Perfect'
  }
  
  if (badge.startsWith('level-')) {
    const levelNum = badge.split('-')[1]
    return `Nivel ${levelNum}`
  }
  
  return badgeMap[badge] || badge.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

function getBadgeColor(badge) {
  const colors = {
    'beginner': 'badge-blue',
    'quiz-master': 'badge-purple',
    'fast-learner': 'badge-green',
    'streak-king': 'badge-red',
    'perfect-score': 'badge-gold',
    'default': 'badge-default'
  }
  
  if (badge.startsWith('level-')) {
    return 'badge-level'
  }
  
  return colors[badge] || colors.default
}

function getBadgeEmoji(badge) {
  const emojis = {
    'beginner': '🎯',
    'quiz-master': '🧠',
    'fast-learner': '⚡',
    'streak-king': '🔥',
    'perfect-score': '⭐',
    'default': '🏆'
  }
  
  if (badge.startsWith('level-')) {
    const levelNum = badge.split('-')[1]
    return `🎖️`
  }
  
  return emojis[badge] || emojis.default
}

function calculateAccuracy() {
  if (!props.totalAnswers || props.totalAnswers === 0) return 0
  return Math.round((props.correctAnswers / props.totalAnswers) * 100)
}
</script>

<style scoped>
/* ===== LAYOUT VERTICAL (PORTRAIT) ===== */
.user-profile {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
}

/* ===== PROFILE HEADER ===== */
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

/* Avatar section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.relative {
  position: relative;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.level-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* User info */
.user-info {
  text-align: center;
  width: 100%;
}

.user-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.user-rank {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.rank-badge,
.points-badge,
.streak-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  white-space: nowrap;
}

/* ===== PROGRESS SECTION ===== */
.progress-section {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.progress-label {
  color: rgba(255, 255, 255, 0.9);
}

.progress-percentage {
  color: #06b6d4;
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
  border-radius: 5px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== STATS GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  text-align: center;
  padding: 0.5rem;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.25rem;
}

.stat-value.good {
  color: #34d399;
}

.stat-value.average {
  color: #fbbf24;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* ===== BADGES SECTION ===== */
.badges-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  width: 24px;
  height: 24px;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 85px;
}

.badge-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.badge-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.badge-name {
  font-size: 0.7rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Badge colors */
.badge-blue { background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3)); }
.badge-purple { background: linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(147, 51, 234, 0.3)); }
.badge-green { background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(21, 128, 61, 0.3)); }
.badge-red { background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3)); }
.badge-gold { background: linear-gradient(135deg, rgba(234, 179, 8, 0.3), rgba(202, 138, 4, 0.3)); }
.badge-level { background: linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3)); }
.badge-default { background: rgba(255, 255, 255, 0.2); }

.more-badges .badge-icon {
  background: rgba(255, 255, 255, 0.1);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .user-profile {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .avatar-image {
    width: 100px;
    height: 100px;
  }
  
  .level-badge {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .user-name {
    font-size: 1.5rem;
  }
  
  .badges-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .badges-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .user-rank {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .rank-badge,
  .points-badge,
  .streak-badge {
    width: 100%;
    max-width: 200px;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-profile {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes badgePop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.badge-item {
  animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.badge-item:nth-child(1) { animation-delay: 0.1s; }
.badge-item:nth-child(2) { animation-delay: 0.2s; }
.badge-item:nth-child(3) { animation-delay: 0.3s; }
.badge-item:nth-child(4) { animation-delay: 0.4s; }
.badge-item:nth-child(5) { animation-delay: 0.5s; }
.badge-item:nth-child(6) { animation-delay: 0.6s; }
.badge-item:nth-child(7) { animation-delay: 0.7s; }
.badge-item:nth-child(8) { animation-delay: 0.8s; }
</style>