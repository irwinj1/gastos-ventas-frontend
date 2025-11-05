<template>
  <v-app-bar app :color="appBarColor">
    <v-app-bar-nav-icon @click="$emit('abrir-aside')" />

    <v-toolbar-title class="d-flex align-center">
      <div class="d-flex align-center">
        <v-img :src="isDark?logoBlanco:logoNegro" width="50" class="mr-2" />
        <span :class="display.mdAndDown.value ? 'text-h6' : 'text-h5'" style="white-space: nowrap; overflow: visible;">
          Admin Panel
        </span>
      </div>
    </v-toolbar-title>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-btn icon @click="toggleTheme" :title="isDark ? 'Cambiar a claro' : 'Cambiar a oscuro'">
      <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import logoBlanco from '/src/assets/img/logo_blanco.png'
import logoNegro from '/src/assets/img/logo.png'
import { useDisplay, useTheme } from 'vuetify'
import { computed } from 'vue'

const display = useDisplay()

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === 'dark')

const appBarColor = computed(() => (isDark.value ? 'grey-darken-4' : 'grey-lighten-4'))

const toggleTheme = () => {
  const next = isDark.value ? 'light' : 'dark'
  theme.global.name.value = next
  try {
    window.localStorage.setItem('theme', next)
  } catch (_) {
    // ignore storage errors
  }
}

defineEmits<{
  (e: 'abrir-aside'): void
}>()
</script>
