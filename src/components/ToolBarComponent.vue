<template>
  <v-app-bar app color="grey-darken-4" dark>
    <v-app-bar-nav-icon @click="$emit('abrir-aside')" />
    <v-toolbar-title class="d-flex align-center ">
      <v-row>
        <v-col> <v-img :src="logoBlanco" width="50" class="mr-2"></v-img></v-col>
        <v-col class="text-subtitle-1 text-center mt-2"><span class="">Admin Panel</span></v-col>
      </v-row>
     
    </v-toolbar-title>
    
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import logoBlanco from '/src/assets/img/logo_blanco.png' // ✅ usa alias @/

defineEmits<{
  (e: 'abrir-aside'): void
}>()
</script>
