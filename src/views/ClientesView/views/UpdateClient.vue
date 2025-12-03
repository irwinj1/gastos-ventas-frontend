<template>
    <v-container>
    <v-card>
      <v-card-text>
        <form-cliente-component ref="clienteForm" :is-goback="isGoback" :cliente-data="cliente1" :is-updated="isUpdateCliente" :is-ver-cliente="isVerCliente"></form-cliente-component>
        <v-row class="d-flex justify-center">
          <v-col cols="auto">
            <v-btn class="text-none" rounded="lg" variant="outlined"  @click="goBack">
              Cancelar
            </v-btn>
          </v-col>

          <v-col cols="auto" v-if="!isVerCliente">
            <v-btn class="text-none" rounded="lg"  @click="updateCliente">Actualizar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <loadign-component :overlay="overlay" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FormClienteComponent from '../../../components/FormClienteComponent.vue';
import { useClientes } from '../composable/useClientes';
import { useRoute, useRouter } from 'vue-router';
import LoadignComponent from '../../../components/LoadignComponent.vue';


const route = useRoute();
const { getClient, cliente1 } = useClientes()
const idCLiente = ref<number>(0)
const isGoback = ref<Boolean>(false)
const router = useRouter()
const clienteForm = ref<InstanceType<typeof FormClienteComponent> | null>(null)
const overlay = ref<Boolean>(false)
const isVerCliente = ref(false)
const isUpdateCliente = ref(false)

const updateCliente = async ()=>{
    try {
      overlay.value = true
       const valid = await clienteForm.value?.submitForm()
       if (valid) {
          router.back()
          
       }
       if(!valid){
        console.warn('Formulario inválido')
        return
       }
    } catch (error) {
        
    }finally{
      overlay.value = false
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

    isVerCliente.value = route.path.includes('ver-cliente')
    idCLiente.value = Number(route.params.id)
    isUpdateCliente.value = route.path.includes('editar-cliente')
    await getClient(idCLiente.value)
})
</script>