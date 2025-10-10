<template>
 <v-navigation-drawer app v-model="props.drawer" permanent>
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in props.menu"
        :key="item.nombre"
        :to="item.uri"
        link
        :active="isActive(item.uri)"
        :class="isActive(item.uri)?'item-activo':''"
      >
        <v-row>
          <v-col cols="3"><v-icon>{{ item.icon }}</v-icon></v-col>
          <v-col><v-list-item-title>{{ item.nombre }}</v-list-item-title></v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'


const props = defineProps({
  drawer: Boolean,
  menu: Array
})

const route = useRoute()

// Función para determinar si la ruta actual coincide
const isActive = (uri: string) => {

  return route.path === uri
}

</script>
<style scoped>
.item-activo {
  background-color: #212121; /* color de fondo del seleccionado */
  color: white; /* color del texto */
}
</style>