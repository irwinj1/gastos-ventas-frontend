<template>
    <v-container>
    <v-card>
      <v-card-text>
        <form-cliente-component ref="clienteForm" :is-goback="isGoback" :cliente-data="cliente1"></form-cliente-component>
        <v-row class="d-flex justify-center">
          <v-col cols="auto">
            <v-btn class="text-none" rounded="lg" variant="outlined" color="grey-darken-4" @click="goBack">
              Cancelar
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="text-none" rounded="lg" color="grey-darken-4" @click="updateCliente"> Agregar </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormClienteComponent from '../../../components/FormClienteComponent.vue';
import { useClientes } from '../composable/useClientes';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const { getClient, cliente1 } = useClientes()
const idCLiente = ref<number>(0)
const isGoback = ref<Boolean>(false)
const router = useRouter()

const updateCliente = ()=>{
    try {
        
    } catch (error) {
        
    }
}
const goBack = () => {
  try {
    router.back()
  } catch (error) {
    console.error(error);

  }
}

onMounted(async () => {
    idCLiente.value = Number(route.params.id)
    await getClient(idCLiente.value)
   

})
</script>