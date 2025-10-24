<template>
    <v-snackbar
      v-model="alert.state.visible"
      timeout="3000"
      :color="alert.state.color"
      location="top right"
      multi-line
    >
      {{ alert.state.message }}
      <template #actions>
        <v-btn variant="text" @click="alert.close()">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script setup lang="ts">
  import { useAlert } from '../composable/useAlert';
  const alert = useAlert()
  </script>