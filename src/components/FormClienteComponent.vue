<template>
    <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Nombre*"
                v-model="cliente.nombre"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
              
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Apellido"
                v-model="cliente.apellido"
                variant="outlined"
                density="compact"
                rounded="lg"
                
              />
            </v-col>
            
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Nombre comercial*"
                v-model="cliente.nombreComercial"
                @blur="$v.nombreComercial.$touch"
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.nombreComercial.$error"
                :error-messages="nombreComercialErrors"
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="DUI*"
                v-model="cliente.dui"
                v-maska="'########-#'"
                @blur="$v.dui.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.dui.$error"
                :error-messages="duiErrors"
               
              />
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="NIT*"
                v-model="cliente.nit"
                @input="validateDocument"
                @blur="$v.nit.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.nit.$error"
                :error-messages="nitErrors"
               
              />
            </v-col>
            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
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
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                label="Teléfono*"
                v-model="cliente.telefono"
                @blur="$v.telefono.$touch"
                v-maska="'####-####'"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.telefono.$error"
                :error-messages="telefonoErrors"
              
              />
            </v-col>

            <v-col cols="12" >
              <v-textarea
                label="Dirección*"
                v-model="cliente.direccion"
                @blur="$v.direccion.$touch"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                rows="3"
                :error="$v.direccion.$error"
                :error-messages="direccionErrors"
               
              />
            </v-col>
          </v-row>

</template>
<script setup lang="ts">
import LoadignComponent from "./LoadignComponent.vue";
import { computed, onMounted, reactive, ref, onUnmounted, watch } from "vue"; // Agregar onUnmounted
import { useClientes } from "../composable/useClientes";
import type { ClientesInterfaces } from "../interfaces";
import useVuelidate from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import { aplicarMascara } from "../config/utils";

const props = defineProps({
    isGoback:{
        type:Boolean,
        default:false
    }
})
// Envío del formulario
const { postCliente } = useClientes();
const emit = defineEmits(["update:addVentasDialog",'obtenerCliente']);
const loading = ref<boolean>(false);
const searchTimeout = ref<number | null>(null); 
// Para debounce
const goBack = computed({
    get: () => props.isGoback,
    set:(value)=>emit("update:addVentasDialog", value)
})

const cliente = reactive<ClientesInterfaces>({
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

// Reglas de validación (igual)
const rules = {
  nombreComercial: { required },
  direccion: { required },
  email: { required, email },
  telefono: { required },
  nit: {
    required: requiredIf(() => !cliente.dui),
  },
  dui: { required: requiredIf(() => !cliente.nit) },
  registro: { required },
};

// Inicializamos Vuelidate
const $v = useVuelidate(rules, cliente);


// Errores computados (igual - mantener como está)
const nombreComercialErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.nombreComercial;
  if (!field.$dirty) return errors;
  if (!field.required.$response)
    errors.push("El nombre comercial es obligatorio");
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
  else if (!field.email.$response)
    errors.push("El formato del email no es válido");
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
  const errors: string[] = [];
  const field = $v.value.dui;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El DUI es obligatorio");
  return errors;
});

const nitErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.nit;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El NIT es obligatorio");
  return errors;
});

const registroErrors = computed(() => {
  const errors: string[] = [];
  const field = $v.value.registro;
  if (!field.$dirty) return errors;
  if (!field.required.$response) errors.push("El número de registro es obligatorio");
  return errors;
});

const limpiarCliente = () => {
  cliente.nombre = "";
  cliente.apellido = "";
  cliente.dui = "";
  cliente.nit = "";
  cliente.email = "";
  cliente.direccion = "";
  cliente.registro = "";
  cliente.nombreComercial = "";
  cliente.telefono = "";
};

const validateDocument = ()=>{
  const validate = aplicarMascara(cliente.nit)
  cliente.nit = validate
}




async function submitForm()  {
    const valid = await $v.value.$validate()
    if (!valid) return false

    // Aquí tu lógica de envío (por ejemplo, API)
    console.log('Formulario válido. Datos:', cliente)
    const response = await postCliente(cliente)
    if (response?.data?.status == 200) {
        return true
    }
    
};

watch(goBack,(newValue)=>{
    if (newValue) {
        $v.value.$reset();
        limpiarCliente();
    }
})

onMounted(async () => {
  try {
   
  } catch (error) {
    console.error('Error cargando clientes:', error);
  }
});

// Limpiar timeout cuando el componente se desmonte
onUnmounted(() => {
  
});
defineExpose({
    cliente,
    submitForm,
    $v
})
</script>