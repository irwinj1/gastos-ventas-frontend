<template>
    <v-snackbar
      v-model="visible"
      :color="color"
      :timeout="timeout"
      :top="top"
      :right="right"
      :multi-line="multiLine"
    >
      {{ message }}
      <template #actions>
        <v-btn text @click="visible = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface AlertOptions {
    message: string
    color?: string
    timeout?: number
    top?: boolean
    right?: boolean
    multiLine?: boolean
  }
  
  const visible = ref(false)
  const message = ref('')
  const color = ref('success')
  const timeout = ref(3000)
  const top = ref(true)
  const right = ref(true)
  const multiLine = ref(false)
  
  export function showAlert(options: AlertOptions) {
    message.value = options.message
    color.value = options.color || 'success'
    timeout.value = options.timeout || 3000
    top.value = options.top ?? true
    right.value = options.right ?? true
    multiLine.value = options.multiLine ?? false
    visible.value = true
  }
  </script>
  