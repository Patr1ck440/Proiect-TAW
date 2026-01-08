import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref({
    id: 1,
    name: 'Utilizator Demo',
    email: 'demo@edubac.ro',
    avatar: '/default-avatar.png',
    level: 3,
    points: 245,
    joinDate: '2024-01-01',
    streak: 7,
    badges: ['beginner', 'quiz-master', 'fast-learner'],
    preferences: {
      theme: 'auto',
      notifications: true,
      sound: true,
      language: 'ro'
    }
  })

  const isAuthenticated = ref(true)
  const lastActive = ref(new Date().toISOString())

  // Getters
  const getUserName = computed(() => user.value.name)
  const getUserEmail = computed(() => user.value.email)
  const getUserLevel = computed(() => user.value.level)
  const getUserPoints = computed(() => user.value.points)
  const getUserAvatar = computed(() => user.value.avatar)
  const getUserStreak = computed(() => user.value.streak)
  const getUserBadges = computed(() => user.value.badges)
  const getUserJoinDate = computed(() => user.value.joinDate)
  const getUserPreferences = computed(() => user.value.preferences)
  const isUserAuthenticated = computed(() => isAuthenticated.value)
  const getUserRank = computed(() => {
    if (user.value.points < 100) return 'Începător'
    if (user.value.points < 500) return 'Intermediar'
    if (user.value.points < 1000) return 'Avansat'
    return 'Expert'
  })
  const getNextLevelPoints = computed(() => {
    const nextLevel = user.value.level + 1
    return nextLevel * 100 - user.value.points
  })
  const getLevelProgress = computed(() => {
    const currentLevelPoints = user.value.points % 100
    return (currentLevelPoints / 100) * 100
  })
  const canReceiveNotifications = computed(() => user.value.preferences.notifications)
  const canPlaySound = computed(() => user.value.preferences.sound)
  const getPreferredTheme = computed(() => user.value.preferences.theme)
  const getPreferredLanguage = computed(() => user.value.preferences.language)

  // Actions
  function login(userData) {
    user.value = { ...user.value, ...userData }
    isAuthenticated.value = true
    lastActive.value = new Date().toISOString()
    console.log('✅ Utilizator autentificat:', user.value.name)
  }

  function logout() {
    user.value = {
      id: null,
      name: '',
      email: '',
      avatar: '/default-avatar.png',
      level: 1,
      points: 0,
      joinDate: null,
      streak: 0,
      badges: [],
      preferences: {
        theme: 'auto',
        notifications: true,
        sound: true,
        language: 'ro'
      }
    }
    isAuthenticated.value = false
    console.log('🚪 Utilizator delogat')
  }

  function updateProfile(updatedData) {
    user.value = { ...user.value, ...updatedData }
    console.log('📝 Profil actualizat')
  }

  function updatePreferences(preferences) {
    user.value.preferences = { ...user.value.preferences, ...preferences }
    console.log('⚙️ Preferințe actualizate')
  }

  function addPoints(pointsToAdd) {
    user.value.points += pointsToAdd
    updateLevel()
    console.log(`🎯 ${pointsToAdd} puncte adăugate. Total: ${user.value.points}`)
  }

  function deductPoints(pointsToDeduct) {
    user.value.points = Math.max(0, user.value.points - pointsToDeduct)
    console.log(`📉 ${pointsToDeduct} puncte scăzute. Total: ${user.value.points}`)
  }

  function updateLevel() {
    const newLevel = Math.floor(user.value.points / 100) + 1
    if (newLevel > user.value.level) {
      user.value.level = newLevel
      addBadge(`level-${newLevel}`)
      console.log(`🏆 Nivel actualizat la: ${user.value.level}`)
    }
  }

  function addBadge(badgeName) {
    if (!user.value.badges.includes(badgeName)) {
      user.value.badges.push(badgeName)
      console.log(`🎖️ Badge adăugat: ${badgeName}`)
    }
  }

  function removeBadge(badgeName) {
    user.value.badges = user.value.badges.filter(badge => badge !== badgeName)
    console.log(`🗑️ Badge eliminat: ${badgeName}`)
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0]
    const lastActiveDate = lastActive.value.split('T')[0]
    
    if (lastActiveDate === today) return
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    if (lastActiveDate === yesterdayStr) {
      user.value.streak++
    } else {
      user.value.streak = 1
    }
    
    lastActive.value = new Date().toISOString()
    console.log(`🔥 Streak actualizat: ${user.value.streak} zile`)
  }

  function resetProgress() {
    user.value.points = 0
    user.value.level = 1
    user.value.streak = 0
    user.value.badges = ['beginner']
    console.log('🔄 Progres resetat')
  }

  function uploadAvatar(avatarUrl) {
    user.value.avatar = avatarUrl
    console.log('🖼️ Avatar actualizat')
  }

  function toggleNotifications() {
    user.value.preferences.notifications = !user.value.preferences.notifications
    console.log(`🔔 Notificări: ${user.value.preferences.notifications ? 'ACTIVATE' : 'DEZACTIVATE'}`)
  }

  function toggleSound() {
    user.value.preferences.sound = !user.value.preferences.sound
    console.log(`🔊 Sunet: ${user.value.preferences.sound ? 'ACTIVAT' : 'DEZACTIVAT'}`)
  }

  function changeTheme(theme) {
    user.value.preferences.theme = theme
    console.log(`🎨 Temă schimbată la: ${theme}`)
  }

  function changeLanguage(language) {
    user.value.preferences.language = language
    console.log(`🌐 Limbă schimbată la: ${language}`)
  }

  return {
    // State
    user,
    isAuthenticated,
    lastActive,
    
    // Getters
    getUserName,
    getUserEmail,
    getUserLevel,
    getUserPoints,
    getUserAvatar,
    getUserStreak,
    getUserBadges,
    getUserJoinDate,
    getUserPreferences,
    isUserAuthenticated,
    getUserRank,
    getNextLevelPoints,
    getLevelProgress,
    canReceiveNotifications,
    canPlaySound,
    getPreferredTheme,
    getPreferredLanguage,
    
    // Actions
    login,
    logout,
    updateProfile,
    updatePreferences,
    addPoints,
    deductPoints,
    updateLevel,
    addBadge,
    removeBadge,
    updateStreak,
    resetProgress,
    uploadAvatar,
    toggleNotifications,
    toggleSound,
    changeTheme,
    changeLanguage
  }
})