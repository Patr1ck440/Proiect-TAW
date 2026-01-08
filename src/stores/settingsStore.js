import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const settings = ref({
    theme: 'light',
    fontSize: 'medium',
    fontFamily: 'Arial',
    language: 'ro',
    soundEnabled: true,
    notifications: true,
    autoSave: true,
    vibration: false,
    highContrast: false,
    reducedMotion: false
  })

  const availableFonts = ref(['Arial', 'Roboto', 'Open Sans', 'Montserrat', 'Georgia'])
  const availableThemes = ref(['light', 'dark', 'blue', 'green'])
  const availableFontSizes = ref(['small', 'medium', 'large', 'x-large'])

  // Getters
  const getTheme = computed(() => settings.value.theme)
  const getFontSize = computed(() => settings.value.fontSize)
  const getFontFamily = computed(() => settings.value.fontFamily)
  const getLanguage = computed(() => settings.value.language)
  const isSoundEnabled = computed(() => settings.value.soundEnabled)
  const areNotificationsEnabled = computed(() => settings.value.notifications)
  const isAutoSaveEnabled = computed(() => settings.value.autoSave)
  const isVibrationEnabled = computed(() => settings.value.vibration)
  const isHighContrast = computed(() => settings.value.highContrast)
  const isReducedMotion = computed(() => settings.value.reducedMotion)
  const getAllSettings = computed(() => settings.value)
  const getAvailableFonts = computed(() => availableFonts.value)
  const getAvailableThemes = computed(() => availableThemes.value)
  const getAvailableFontSizes = computed(() => availableFontSizes.value)

  // Actions
  function setTheme(theme) {
    if (availableThemes.value.includes(theme)) {
      settings.value.theme = theme
      localStorage.setItem('theme', theme)
      console.log(`🎨 Temă schimbată la: ${theme}`)
    }
  }

  function setFontSize(size) {
    if (availableFontSizes.value.includes(size)) {
      settings.value.fontSize = size
      localStorage.setItem('fontSize', size)
      console.log(`🔠 Mărime font schimbată la: ${size}`)
    }
  }

  function setFontFamily(font) {
    if (availableFonts.value.includes(font)) {
      settings.value.fontFamily = font
      localStorage.setItem('fontFamily', font)
      console.log(`✏️ Font schimbat la: ${font}`)
    }
  }

  function setLanguage(lang) {
    settings.value.language = lang
    localStorage.setItem('language', lang)
    console.log(`🌐 Limbă schimbată la: ${lang}`)
  }

  function toggleSound() {
    settings.value.soundEnabled = !settings.value.soundEnabled
    console.log(`🔊 Sunet: ${settings.value.soundEnabled ? 'ACTIVAT' : 'DEZACTIVAT'}`)
  }

  function toggleNotifications() {
    settings.value.notifications = !settings.value.notifications
    console.log(`🔔 Notificări: ${settings.value.notifications ? 'ACTIVATE' : 'DEZACTIVATE'}`)
  }

  function toggleAutoSave() {
    settings.value.autoSave = !settings.value.autoSave
    console.log(`💾 Auto-save: ${settings.value.autoSave ? 'ACTIVAT' : 'DEZACTIVAT'}`)
  }

  function toggleVibration() {
    settings.value.vibration = !settings.value.vibration
    console.log(`📳 Vibrație: ${settings.value.vibration ? 'ACTIVATĂ' : 'DEZACTIVATĂ'}`)
  }

  function toggleHighContrast() {
    settings.value.highContrast = !settings.value.highContrast
    console.log(`🎭 Contrast ridicat: ${settings.value.highContrast ? 'ACTIVAT' : 'DEZACTIVAT'}`)
  }

  function toggleReducedMotion() {
    settings.value.reducedMotion = !settings.value.reducedMotion
    console.log(`🎬 Mișcare redusă: ${settings.value.reducedMotion ? 'ACTIVATĂ' : 'DEZACTIVATĂ'}`)
  }

  function resetToDefaults() {
    settings.value = {
      theme: 'light',
      fontSize: 'medium',
      fontFamily: 'Arial',
      language: 'ro',
      soundEnabled: true,
      notifications: true,
      autoSave: true,
      vibration: false,
      highContrast: false,
      reducedMotion: false
    }
    console.log('🔄 Setări resetate la valorile implicite')
  }

  function loadSettings() {
    const savedTheme = localStorage.getItem('theme')
    const savedFontSize = localStorage.getItem('fontSize')
    const savedFontFamily = localStorage.getItem('fontFamily')
    const savedLanguage = localStorage.getItem('language')
    
    if (savedTheme) settings.value.theme = savedTheme
    if (savedFontSize) settings.value.fontSize = savedFontSize
    if (savedFontFamily) settings.value.fontFamily = savedFontFamily
    if (savedLanguage) settings.value.language = savedLanguage
    
    console.log('📥 Setări încărcate din localStorage')
  }

  function saveSettings() {
    Object.keys(settings.value).forEach(key => {
      localStorage.setItem(key, settings.value[key])
    })
    console.log('💾 Setări salvate în localStorage')
  }

  function addCustomFont(font) {
    if (!availableFonts.value.includes(font)) {
      availableFonts.value.push(font)
      console.log(`➕ Font personalizat adăugat: ${font}`)
    }
  }

  function addCustomTheme(theme) {
    if (!availableThemes.value.includes(theme)) {
      availableThemes.value.push(theme)
      console.log(`➕ Temă personalizată adăugată: ${theme}`)
    }
  }

  return {
    // State
    settings,
    availableFonts,
    availableThemes,
    availableFontSizes,
    
    // Getters
    getTheme,
    getFontSize,
    getFontFamily,
    getLanguage,
    isSoundEnabled,
    areNotificationsEnabled,
    isAutoSaveEnabled,
    isVibrationEnabled,
    isHighContrast,
    isReducedMotion,
    getAllSettings,
    getAvailableFonts,
    getAvailableThemes,
    getAvailableFontSizes,
    
    // Actions
    setTheme,
    setFontSize,
    setFontFamily,
    setLanguage,
    toggleSound,
    toggleNotifications,
    toggleAutoSave,
    toggleVibration,
    toggleHighContrast,
    toggleReducedMotion,
    resetToDefaults,
    loadSettings,
    saveSettings,
    addCustomFont,
    addCustomTheme
  }
})