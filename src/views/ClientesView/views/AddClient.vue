<template>
  <v-container>
    <v-card>
      <v-card-text>
        <form-cliente-component ref="clienteForm" :is-goback="isGoback"></form-cliente-component>
        <v-row class="d-flex justify-center">
          <v-col cols="auto">
            <v-btn class="text-none" rounded="lg" variant="outlined"  @click="goBack">
              Cancelar
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn class="text-none" rounded="lg" @click="submitForm"> Agregar </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FormClienteComponent from "../../../components/FormClienteComponent.vue";
import { useRouter } from "vue-router";
const isGoback = ref<Boolean>(false)
const router = useRouter()

const clienteForm = ref<InstanceType<typeof FormClienteComponent> | null>(null)
const goBack = () => {
  try {
    router.back()
  } catch (error) {
    console.error(error);

  }
}
const submitForm = async () => {
  try {
    //  Ejecutar la validación + submit dentro del hijo
    const valid = await clienteForm.value?.submitForm()

    // 2️⃣ (Opcional) acceder directamente a Vuelidate
    if (!valid) {
      console.warn('Formulario inválido')
      return
    }
    goBack()

  } catch (error) {
    console.error('Error en submitForm:', error)
  }
}

</script>
