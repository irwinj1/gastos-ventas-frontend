<template>
  <v-dialog v-model="modelValue" width="auto" persistent>
    <v-card prepend-icon="mdi-account" title="Cliente" width="700" rounded="xl">
      <v-form @submit.prevent="submitForm" ref="vForm">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Nombre*"
                v-model="cliente.nombre"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Apellido"
                v-model="cliente.apellido"
                variant="outlined"
                density="compact"
                rounded="lg"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Nombre comercial*"
                v-model="cliente.nombreComercial"
                @blur="$v.nombreComercial.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.nombreComercial.$error"
                :error-messages="nombreComercialErrors"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="DUI*"
                v-model="cliente.dui"
                @blur="$v.dui.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.dui.$error"
                :error-messages="duiErrors"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="NIT*"
                v-model="cliente.nit"
                @blur="$v.nit.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.nit.$error"
                :error-messages="nitErrors"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Email*"
                v-model="cliente.email"
                @blur="$v.email.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.email.$error"
                :error-messages="emailErrors"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Numero de registro*"
                v-model="cliente.registro"
                @blur="$v.registro.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.registro.$error"
                :error-messages="registroErrors"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Teléfono*"
                v-model="cliente.telefono"
                @blur="$v.telefono.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.telefono.$error"
                :error-messages="telefonoErrors"
              />
            </v-col>

            <v-col cols="12" md="8" sm="6">
              <v-textarea
                label="Dirección*"
                v-model="cliente.direccion"
                @blur="$v.direccion.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                rows="1"
                :error="$v.direccion.$error"
                :error-messages="direccionErrors"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text="Cancelar" variant="plain" @click="closeDialog" />
          <v-btn color="primary" text="Guardar" variant="tonal" @click="submitForm" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <loadign-component :overlay="loading" />
</template>

<script setup lang="ts">
import LoadignComponent from "../../../components/LoadignComponent.vue";
import { computed, reactive, ref } from "vue";
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
const { postCliente, loading } = useClientes();
const emit = defineEmits(["update:addVentasDialog"]);

const cliente = reactive<Clientes>({
  nombre: "",
  apellido: "",
  nombreComercial: "",
  dui: "",
  nit: "",
  registro:"",
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
  dui: {required:requiredIf(()=>!cliente.nit)},
  registro:{required}
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
const duiErrors = computed(()=>{
  const errors: string[] = []
  const field = $v.value.dui;
  if(!field.$dirty) return errors;
  if(!field.required.$response) errors.push("El DUI es obligatorio")
  return errors
})
const nitErrors = computed(()=>{
  const errors: string[] = []
  const field = $v.value.nit;
  if(!field.$dirty) return errors;
  if(!field.required.$response) errors.push("El NIT es obligatorio")
  return errors
})
const registroErrors = computed(()=>{
  const errors: string[] = []
  const field = $v.value.registro;
  if(!field.$dirty) return errors;
  if(!field.required.$response) errors.push("El NIT es obligatorio")
  return errors
})

// Referencia al formulario
// const vForm = ref<InstanceType<typeof VForm> | null>(null);

// Control del diálogo
const modelValue = computed({
  get: () => props.addVentasDialog,
  set: (value) => emit("update:addVentasDialog", value),
});

const closeDialog = () => {
  modelValue.value = false;
  $v.value.$reset()
};



const submitForm = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    console.log("Formulario inválido");
    return;
  }
  // Lógica para enviar los datos
 await postCliente(cliente);
  closeDialog();
};
</script>
