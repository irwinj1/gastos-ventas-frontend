<template>
  <v-navigation-drawer app v-model="props.drawer" temporary>
    <v-list density="compact" nav>
      <v-list-item>
        <v-btn
          density="compact"
          icon="mdi-reorder-horizontal"
          elevation="0"
          @click="toggleDrawer"
        ></v-btn>
      </v-list-item>

      <v-list-item
        v-for="item in props.menu"
        :key="item.nombre"
        :to="item.uri"
        link
        @click="toggleDrawer"
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  drawer: Boolean,
  menu: Array
})

const emit = defineEmits(['update:drawer'])

const toggleDrawer = ()=>{
  emit('update:drawer')
}
const route = useRoute()

const isActive = (uri: string) => route.path === uri
</script>

<style scoped>
.item-activo {
  background-color: #212121;
  color: white;
}
</style>
