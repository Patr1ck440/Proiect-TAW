<template>
  <div class="settings-page p-6 max-w-4xl mx-auto min-h-screen">
    <!-- Header -->
    <div class="header-section mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">⚙️ Setări</h1>
      <p class="text-gray-600 dark:text-gray-300">Personalizează-ți experiența</p>
    </div>

    <!-- Navigare simplă - doar 2 tab-uri -->
    <div class="settings-nav mb-8">
      <div class="flex flex-wrap gap-2 mb-6">
        <button @click="activeTab = 'display'"
                class="px-4 py-2 rounded-lg transition"
                :class="activeTab === 'display' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'">
          🎨 Afișare
        </button>
        <button @click="activeTab = 'general'"
                class="px-4 py-2 rounded-lg transition"
                :class="activeTab === 'general' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'">
          ⚙️ General
        </button>
      </div>
    </div>

    <!-- Conținut setări -->
    <div class="settings-content">
      
      <!-- Afișare (Tab 1) -->
      <div v-if="activeTab === 'display'" class="space-y-6">
        
        <!-- Temă -->
        <div class="card bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div class="setting-item mb-6">
            <div class="flex justify-between items-center mb-3">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white text-lg">Temă</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Alege aspectul aplicației</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {{ currentTheme }}
              </span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button v-for="theme in availableThemes" 
                      :key="theme"
                      @click="setTheme(theme)"
                      class="p-4 rounded-lg border transition hover:scale-105"
                      :class="currentTheme === theme 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-700'">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full" :class="getThemeColor(theme)"></div>
                  <span class="capitalize">{{ theme }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Font -->
          <div class="setting-item mb-6">
            <div class="flex justify-between items-center mb-3">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white text-lg">Font</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Alege stilul textului</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {{ currentFontFamily }}
              </span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button v-for="font in availableFonts" 
                      :key="font"
                      @click="setFontFamily(font)"
                      class="p-4 rounded-lg border transition hover:scale-105"
                      :class="currentFontFamily === font 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-700'">
                <span :style="{ fontFamily: font }">{{ font }}</span>
              </button>
            </div>
          </div>

          <!-- Mărime font -->
          <div class="setting-item">
            <div class="flex justify-between items-center mb-3">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white text-lg">Mărime text</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Ajustează dimensiunea textului</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize">
                {{ currentFontSize }}
              </span>
            </div>
            <div class="grid grid-cols-4 gap-3">
              <button v-for="size in availableFontSizes" 
                      :key="size"
                      @click="setFontSize(size)"
                      class="p-4 rounded-lg border transition hover:scale-105"
                      :class="currentFontSize === size 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-700'">
                <span class="text-lg" :class="getFontSizeClass(size)">Aa</span>
                <p class="text-xs mt-1 capitalize">{{ size }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- General (Tab 2) -->
      <div v-if="activeTab === 'general'" class="space-y-6">
        
        <!-- Limbă -->
        <div class="card bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div class="setting-item mb-6">
            <div class="flex justify-between items-center mb-3">
              <div>
                <h3 class="font-medium text-gray-800 dark:text-white text-lg">Limbă</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Alege limba interfeței</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {{ currentLanguage === 'ro' ? 'Română' : 'English' }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button @click="setLanguage('ro')"
                      class="p-4 rounded-lg border transition hover:scale-105"
                      :class="currentLanguage === 'ro' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-700'">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">🇷🇴</span>
                  <span>Română</span>
                </div>
              </button>
              <button @click="setLanguage('en')"
                      class="p-4 rounded-lg border transition hover:scale-105"
                      :class="currentLanguage === 'en' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-gray-300 dark:border-gray-700'">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">🇬🇧</span>
                  <span>English</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Notificări -->
          <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Notificări</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Primește notificări și reamintiri</p>
            </div>
            <button @click="toggleNotifications" 
                    class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
                    :class="areNotificationsEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'">
              <span class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                    :class="areNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>

          <!-- Auto-save -->
          <div class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Salvare automată</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Salvează progresul automat</p>
            </div>
            <button @click="toggleAutoSave" 
                    class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
                    :class="isAutoSaveEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'">
              <span class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                    :class="isAutoSaveEnabled ? 'translate-x-6' : 'translate-x-1'"></span>
            </button>
          </div>
        </div>

        <!-- Acțiuni -->
        <div class="card bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Acțiuni</h3>
          
          <div class="space-y-3">
            <button @click="saveSettings"
                    class="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Salvează setările
            </button>
            
            <button @click="loadSettings"
                    class="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Încarcă setări salvate
            </button>
            
            <button @click="resetSettings"
                    class="w-full p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Resetează la setările implicite
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stare curentă (simplă) -->
    <div class="current-settings mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h4 class="font-medium text-gray-800 dark:text-white mb-2">Setări curente</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Temă</p>
          <p class="font-medium capitalize">{{ currentTheme }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Font</p>
          <p class="font-medium">{{ currentFontFamily }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Mărime</p>
          <p class="font-medium capitalize">{{ currentFontSize }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">Limbă</p>
          <p class="font-medium">{{ currentLanguage === 'ro' ? 'RO' : 'EN' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'

// 🔥 PINIA STORE
const settingsStore = useSettingsStore()

// Local state
const activeTab = ref('display')

// ===== COMPUTED PROPERTIES =====
const currentTheme = computed(() => settingsStore.getTheme)
const currentFontSize = computed(() => settingsStore.getFontSize)
const currentFontFamily = computed(() => settingsStore.getFontFamily)
const currentLanguage = computed(() => settingsStore.getLanguage)
const areNotificationsEnabled = computed(() => settingsStore.areNotificationsEnabled)
const isAutoSaveEnabled = computed(() => settingsStore.isAutoSaveEnabled)

const availableFonts = computed(() => settingsStore.getAvailableFonts)
const availableThemes = computed(() => settingsStore.getAvailableThemes)
const availableFontSizes = computed(() => settingsStore.getAvailableFontSizes)

// ===== METHODS =====
function setTheme(theme) {
  settingsStore.setTheme(theme)
  // Aplică tema global
  document.documentElement.setAttribute('data-theme', theme)
}

function setFontSize(size) {
  settingsStore.setFontSize(size)
  applyFontSize()
}

function setFontFamily(font) {
  settingsStore.setFontFamily(font)
  applyFontFamily()
}

function setLanguage(lang) {
  settingsStore.setLanguage(lang)
  showMessage(`Limbă schimbată în ${lang === 'ro' ? 'română' : 'engleză'}`)
}

function toggleNotifications() {
  settingsStore.toggleNotifications()
  showMessage(`Notificări ${areNotificationsEnabled.value ? 'activate' : 'dezactivate'}`)
}

function toggleAutoSave() {
  settingsStore.toggleAutoSave()
  showMessage(`Auto-save ${isAutoSaveEnabled.value ? 'activat' : 'dezactivat'}`)
}

function saveSettings() {
  settingsStore.saveSettings()
  showMessage('Setările au fost salvate!', 'success')
}

function loadSettings() {
  settingsStore.loadSettings()
  applyGlobalSettings()
  showMessage('Setările au fost încărcate!', 'info')
}

function resetSettings() {
  if (confirm('Sigur vrei să resetezi toate setările la valorile implicite?')) {
    settingsStore.resetToDefaults()
    applyGlobalSettings()
    showMessage('Setările au fost resetate!', 'warning')
  }
}

// Helper functions
function getThemeColor(theme) {
  const colors = {
    light: 'bg-gray-200',
    dark: 'bg-gray-800',
    blue: 'bg-blue-500',
    green: 'bg-green-500'
  }
  return colors[theme] || 'bg-gray-200'
}

function getFontSizeClass(size) {
  const sizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    'x-large': 'text-xl'
  }
  return sizes[size] || 'text-base'
}

function showMessage(message, type = 'info') {
  // Poți înlocui cu o componentă de notificare dacă ai
  const colors = {
    success: 'text-green-600 bg-green-100',
    info: 'text-blue-600 bg-blue-100',
    warning: 'text-yellow-600 bg-yellow-100'
  }
  
  // Crează un toast temporar
  const toast = document.createElement('div')
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-lg ${colors[type] || colors.info}`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}

// Funcții pentru aplicarea setărilor globale
function applyFontSize() {
  const sizeMap = {
    small: '14px',
    medium: '16px',
    large: '18px',
    'x-large': '20px'
  }
  document.documentElement.style.fontSize = sizeMap[currentFontSize.value] || '16px'
}

function applyFontFamily() {
  document.body.style.fontFamily = currentFontFamily.value
}

function applyGlobalSettings() {
  // Tema
  const theme = settingsStore.getTheme
  document.documentElement.setAttribute('data-theme', theme)
  
  // Font
  applyFontFamily()
  
  // Font size
  applyFontSize()
}

// Initialize on mount
onMounted(() => {
  settingsStore.loadSettings()
  applyGlobalSettings()
})
</script>

<style scoped>
.settings-page {
  background: linear-gradient(135deg, darkcyan 0%, darkcyan 100%);
}

.dark .settings-page {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}

.setting-item {
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Hover effects */
.setting-item:hover {
  transform: translateY(-2px);
}

button:not(:disabled):hover {
  transform: scale(1.02);
}

.current-settings {
  transition: all 0.3s ease;
}
</style>