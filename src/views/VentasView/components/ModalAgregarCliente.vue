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
                @input="onNombreApellidoChange"
                required
                variant="outlined"
                density="compact"
                rounded="lg"
                :disabled="isCliente"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Apellido"
                v-model="cliente.apellido"
                variant="outlined"
                density="compact"
                rounded="lg"
                @input="onNombreApellidoChange"
                :disabled="isCliente"
              />
            </v-col>
            
            <v-col cols="12" md="4" sm="6">
              <v-combobox
                label="Nombre comercial*"
                v-model="cliente.nombreComercial"
                :items="clientes"
                item-title="nombreComercial"
                item-value="nombreComercial"
                :loading="loading"
                clearable
                persistent-hint
                variant="outlined"
                density="compact"
                rounded="lg"
                :error="$v.nombreComercial.$error"
                :error-messages="nombreComercialErrors"
                @update:search="onSearchNombreComercial"
                @update:model-value="onClienteSeleccionado"
                @click:clear="limpiarClienteForm"
                no-filter
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
                :disabled="isCliente"
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
                :disabled="isCliente"
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
                :disabled="isCliente"
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
                :disabled="isCliente"
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
                :disabled="isCliente"
              />
            </v-col>

            <v-col cols="12" md="4" sm="6">
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
                :disabled="isCliente"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="align-center justify-center">
          <v-btn
            text="Cancelar"
            variant="outlined"
            rounded="lg"
            class="text-none"
            @click="closeDialog"
          />
          <v-btn
            color="grey-darken-4"
            text="Guardar"
            variant="elevated"
            rounded="lg"
            @click="submitForm"
            class="text-none"
            :disabled="isCliente"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <loadign-component :overlay="loading" />
  <alerta-component />
</template>

<script setup lang="ts">
import LoadignComponent from "../../../components/LoadignComponent.vue";
import { computed, onMounted, reactive, ref, onUnmounted } from "vue"; // Agregar onUnmounted
import { useClientes } from "../composables/useClientes";
import type { ClientesInterfaces } from "../../../interfaces";
import useVuelidate from "@vuelidate/core";
import { required, email, requiredIf } from "@vuelidate/validators";
import { VForm } from "vuetify/components";
import AlertaComponent from "../../../components/AlertaComponent.vue";





const props = defineProps({
  addVentasDialog: {
    type: Boolean,
    required: true,
    default: false,
  },
});
function alertSuccess(message:string,color:string) {
  showAlert({
    message,
    color,
    timeout: 4000,
  })
}
// Envío del formulario
const { postCliente, getCliente, cliente1, getClientes, clientes } = useClientes();
const emit = defineEmits(["update:addVentasDialog",'obtenerCliente']);
const loading = ref<boolean>(false);
const isCliente = ref<boolean>(true);
const searchTimeout = ref<number | null>(null); // Para debounce
 
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

// Control del diálogo
const modelValue = computed({
  get: () => props.addVentasDialog,
  set: (value) => emit("update:addVentasDialog", value),
});

const closeDialog = () => {
  modelValue.value = false;
  $v.value.$reset();
  limpiarCliente();
};

const submitForm = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    return;
  }
  try {
    loading.value = true;
    await postCliente(cliente);
    // si da error guardar  cliente

    emit('obtenerCliente')
    closeDialog();
    loading.value = false;
    
    await getClientes();
  } catch (error) {
    loading.value = false;
    console.error('Error al guardar cliente:', error);
  }
};

// Función debounce para búsquedas
const debouncedSearch = (fn: () => void, delay = 500) => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  searchTimeout.value = window.setTimeout(fn, delay);
};

const buscarCliente = async (searchObj: any) => {
  try {
    if (Object.keys(searchObj).length > 0) {
      loading.value = true;
      await getCliente(searchObj);
      
      if (cliente1.value) {
        cliente.nombre = cliente1.value?.nombre || "";
        cliente.apellido = cliente1.value?.apellido || "";
        cliente.dui = cliente1.value?.dui || "";
        cliente.nit = cliente1.value?.nit || "";
        cliente.registro = cliente1.value?.n_registro || "";
        cliente.email = cliente1.value?.email || "";
        cliente.direccion = cliente1.value?.direccion || "";
        cliente.telefono = cliente1.value?.telefono || "";
        isCliente.value = false;
      }
    }
  } catch (error) {
    console.error('Error buscando cliente:', error);
  } finally {
    loading.value = false;
  }
};

// const onNombreApellidoChange = () => {
//   const searchObj: any = {};
  
//   if (cliente.nombre && cliente.nombre.length >= 3) {
//     searchObj.nombre = cliente.nombre;
//   }
//   if (cliente.apellido && cliente.apellido.length >= 3) {
//     searchObj.apellido = cliente.apellido;
//   }

//   if (Object.keys(searchObj).length > 0) {
//     debouncedSearch(() => {
//       buscarCliente(searchObj);
//     }, 500);
//   }
// };

const onSearchNombreComercial = async (value: string) => {
  cliente.nombreComercial = value;

  // Si escribe menos de 3 letras, solo desbloqueamos los campos vacíos
  if (!value || value.length < 3) {
    isCliente.value = false;
    return;
  }

  try {
    loading.value = true;
    await buscarCliente(value);
    loading.value = false;

    // Si se encontró el cliente
    if (cliente1.value && cliente1.value.nombre_comercial) {
      cliente.nombre = cliente1.value?.nombre || "";
      cliente.apellido = cliente1.value?.apellido || "";
      cliente.dui = cliente1.value?.dui || "";
      cliente.nit = cliente1.value?.nit || "";
      cliente.registro = cliente1.value?.n_registro || "";
      cliente.email = cliente1.value?.email || "";
      cliente.direccion = cliente1.value?.direccion || "";
      cliente.telefono = cliente1.value?.telefono || "";

      isCliente.value = true; // Bloqueamos porque ya existe
    } else {
      // Si no se encontró ningún cliente
      limpiarCliente();
      cliente.nombreComercial = value; // mantenemos lo escrito
      isCliente.value = false; // habilitamos los campos
    }

  } catch (error) {
    loading.value = false;
    isCliente.value = false;
  }
};

const onClienteSeleccionado = (value: string) => {
  if (value) {
    const seleccionado = clientes.value.find(
      (c) => c.nombreComercial === value
    );
    if (seleccionado) {
      cliente.nombre = seleccionado.nombre;
      cliente.apellido = seleccionado.apellido;
      cliente.dui = seleccionado.dui;
      cliente.nit = seleccionado.nit;
      cliente.nombreComercial = value;
      cliente.registro = seleccionado.n_registro;
      cliente.email = seleccionado.email;
      cliente.direccion = seleccionado.direccion;
      cliente.telefono = seleccionado.telefono;
      isCliente.value = false;
    } else {
      limpiarCamposExceptoNombreComercial();
    }
  } else {
    limpiarClienteForm();
  }
};

const limpiarCamposExceptoNombreComercial = () => {
  const nombreComercialTemp = cliente.nombreComercial;
  limpiarCliente();
  cliente.nombreComercial = nombreComercialTemp;
  isCliente.value = true;
};

const limpiarClienteForm = () => {
  limpiarCliente();
  isCliente.value = true;
};

onMounted(async () => {
  try {
    await getClientes();
  } catch (error) {
    console.error('Error cargando clientes:', error);
  }
});

// Limpiar timeout cuando el componente se desmonte
onUnmounted(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});
</script>