<template>
  <v-dialog v-model="modelValue" width="auto" persistent>
    <v-card prepend-icon="mdi-account" title="Cliente" width="700" rounded="xl">
      <v-form @submit.prevent="submitForm" ref="vForm">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Nombre*" v-model="cliente.nombre" @input="buscarCliente" required variant="outlined"
                density="compact" rounded="lg" :disabled="isCliente" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Apellido" v-model="cliente.apellido" variant="outlined" density="compact"
                rounded="lg" @input="buscarCliente" :disabled="isCliente" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-autocomplete label="Nombre comercial*" v-model="cliente.nombreComercial" :items="clientes" item-title="nombreComercial" item-value="nombreComercial"
                :loading="loading" hide-no-data clearable persistent-hint required variant="outlined" density="compact"
                rounded="lg" :error="$v.nombreComercial.$error" :error-messages="nombreComercialErrors"
                @update:model-value="onNombreComercialChange" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field label="DUI*" v-model="cliente.dui" @blur="$v.dui.$touch" required variant="outlined"
                density="compact" rounded="lg" :error="$v.dui.$error" :error-messages="duiErrors"
                :disabled="isCliente" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field label="NIT*" v-model="cliente.nit" @blur="$v.nit.$touch" required variant="outlined"
                density="compact" rounded="lg" :error="$v.nit.$error" :error-messages="nitErrors"
                :disabled="isCliente" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Email*" v-model="cliente.email" @blur="$v.email.$touch" required variant="outlined"
                density="compact" rounded="lg" :error="$v.email.$error" :error-messages="emailErrors"
                :disabled="isCliente" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Numero de registro*" v-model="cliente.registro" @blur="$v.registro.$touch" required
                variant="outlined" density="compact" rounded="lg" :error="$v.registro.$error"
                :error-messages="registroErrors" :disabled="isCliente" />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field label="Teléfono*" v-model="cliente.telefono" @blur="$v.telefono.$touch" required
                variant="outlined" density="compact" rounded="lg" :error="$v.telefono.$error"
                :error-messages="telefonoErrors" :disabled="isCliente" />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-textarea label="Dirección*" v-model="cliente.direccion" @blur="$v.direccion.$touch" required
                variant="outlined" density="compact" rounded="lg" rows="1" :error="$v.direccion.$error"
                :error-messages="direccionErrors" :disabled="isCliente" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="align-center justify-center">

          <v-btn text="Cancelar" variant="outlined" rounded="lg" @click="closeDialog" />
          <v-btn color="grey-darken-4" text="Guardar" variant="elevated" rounded="lg" @click="submitForm"
            :disabled="isCliente" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <loadign-component :overlay="loading" />
</template>

<script setup lang="ts">
import LoadignComponent from "../../../components/LoadignComponent.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useClientes } from "../composables/useClientes";
import type { Clientes } from "../../../interfaces";
import useVuelidate from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import { VForm } from "vuetify/components";

const props = defineProps({
  addVentasDialog: {
    type: Boolean,
    required: true,
    default: true,
  },
});
// Envío del formulario
const { postCliente, getCliente, cliente1,getClientes, clientes } = useClientes();
const emit = defineEmits(["update:addVentasDialog"]);
const loading = ref<boolean>(false)
const isCliente = ref<boolean>(true)
const cliente = reactive<Clientes>({
  nombre: "",
  apellido: "",
  nombreComercial: "",
  dui: "",
  nit: "",
  registro: "",
  direccion: "",
  email: "",
  telefono: "",
  esCliente: true,
  esProveedor: false,
});

// Reglas de validación
const rules = {
  nombreComercial: { required },
  direccion: { required },
  email: { required, email },
  telefono: { required },
  nit: {
    required: requiredIf(() => !cliente.dui) // Será requerido si dui está vacío o es null
  },
  dui: { required: requiredIf(() => !cliente.nit) },
  registro: { required }
};

// Inicializamos Vuelidate
const $v = useVuelidate(rules, cliente);

// Errores computados
const nombreComercialErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.nombreComercial;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El nombre comercial es obligatorio");
  return errors;
});

const direccionErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.direccion;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("La dirección es obligatoria");
  return errors;
});

const emailErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.email;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El email es obligatorio");
  else if (!field.email.$response) errors.push("El formato del email no es válido");
  return errors;
});

const telefonoErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.telefono;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El teléfono es obligatorio");
  return errors;
});
const duiErrors = computed(() => {
  const errors: string[] = []
  const field = $v.value.dui;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El DUI es obligatorio")
  return errors
})
const nitErrors = computed(() => {
  const errors: string[] = []
  const field = $v.value.nit;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El NIT es obligatorio")
  return errors
})
const registroErrors = computed(() => {
  const errors: string[] = []
  const field = $v.value.registro;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El NIT es obligatorio")
  return errors
})

// Referencia al formulario
// const vForm = ref<InstanceType<typeof VForm> | null>(null);

const limpiarCliente = () => {
  cliente.nombre = ""
  cliente.apellido = ""
  cliente.dui = ""
  cliente.nit = ""
  cliente.email = ""
  cliente.direccion = ""
  cliente.registro = ""
  cliente.nombreComercial = ""
  cliente.telefono = ""
}
// Control del diálogo
const modelValue = computed({
  get: () => props.addVentasDialog,
  set: (value) => emit("update:addVentasDialog", value),
});

const closeDialog = () => {
  modelValue.value = false;
  $v.value.$reset()
  limpiarCliente()
};



const submitForm = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    return;
  }
  try {
    loading.value = true
    // Lógica para enviar los datos
    await postCliente(cliente);
    closeDialog();
    loading.value = false
  } catch (error) {

  }

};

const buscarCliente = async () => {
  try {

    const obj: any = {};
    if (cliente.nombre && cliente.nombre.length > 0) {
      obj.nombre = cliente.nombre;
    }
    if (cliente.apellido && cliente.apellido.length > 0) {
      obj.apellido = cliente.apellido;
    }
    if (cliente.nombreComercial && cliente.nombreComercial.length > 0) {
      obj.nombreComercial = cliente.nombreComercial;
    }
    if (cliente?.nombre.length >= 3 || cliente.apellido.length >= 3 || cliente?.nombreComercial.length >= 3) {
      loading.value = true
      await getCliente(obj)
      loading.value = false
    }

    console.log(cliente1.value);
  } catch (error) {

  }
}

onMounted(async ()=>{
  try {
    await getClientes()
    console.log(clientes.value);
    
  } catch (error) {
    
  }
})
</script>
