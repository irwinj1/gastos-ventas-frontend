<template>
  <v-row dense>
    <v-col cols="12" md="6" sm="6">
      <v-text-field
        label="Nombre"
        v-model="cliente.nombre"
        required
        variant="outlined"
        density="compact"
        rounded="lg"
        :disabled="isVerCliente"
      />
    </v-col>

    <v-col cols="12" md="6" sm="6">
      <v-text-field
        label="Apellido"
        v-model="cliente.apellido"
        variant="outlined"
        density="compact"
        rounded="lg"
        :disabled="isVerCliente"
      />
    </v-col>

    <v-col cols="12" md="6" sm="6">
      <v-combobox
        label="Nombre comercial*"
        v-model="clienteSeleccionado"
        :items="clientes"
        item-title="nombreComercial"
        item-value="id"
        clearable
        persistent-hint
        variant="outlined"
        density="compact"
        rounded="lg"
        return-object
        no-filter
        @update:search="onSearchNombreComercial"
        @update:model-value="onSelectNombreComercial"
        @click:clear="limpiarCliente"
        :disabled="isVerCliente"
      >
        <template #no-data>
          <v-list-item title="Cliente nuevo — se registrará" />
        </template>
      </v-combobox>
      <!-- <v-text-field label="Nombre comercial*" v-model="cliente.nombreComercial" @blur="$v.nombreComercial.$touch"
        variant="outlined" density="compact" rounded="lg" :error="$v.nombreComercial.$error"
        :error-messages="nombreComercialErrors" /> -->
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
        :disabled="isVerCliente"
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
        :disabled="isVerCliente"
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
        :disabled="isVerCliente"
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
        :disabled="isVerCliente"
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
        :disabled="isVerCliente "
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-autocomplete
        density="compact"
        rounded="lg"
        v-model="idpais"
        variant="outlined"
        no-data-text="No hay paises disponibles"
        clearable
        @click:clear="limpiarCatalogos({ isPais: true })"
        :filter="() => true"
        label="País"
        :items="paises"
        item-title="nombre"
        item-value="id"
        @update:model-value="buscarDepartamento"
        @update:search="buscarTexto"
        :disabled="isVerCliente"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" sm="6">
      <v-autocomplete
        density="compact"
        rounded="lg"
        variant="outlined"
        v-model="idDepartamento"
        :items="departamentos"
        item-title="nombre"
        item-value="id"
        no-data-text="No hay departamentos disponibles"
        label="Departamentos"
        :disabled="isPais || isVerCliente"
        clearable
        @click:clear="limpiarCatalogos({ isDepartamento: true })"
        @update:model-value="buscarMunicipio"
        @update:search="buscarTextoDepartamento"
        
        :filter="() => true"
        
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" sm="6">
      <v-select
        density="compact"
        rounded="lg"
        variant="outlined"
        v-model="idMunicipio"
        :items="municipios"
        item-title="nombre"
        item-value="id"
        no-data-text="No hay municipios disponibles"
        label="Municipios"
        clearable
        @click:clear="limpiarCatalogos({ isMunicipio: true })"
        :disabled="isDepartamento || isVerCliente"
        @update:model-value="buscarDistrito"
        @update:search="buscarTextoMunicipio"
        
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6">
      <v-autocomplete
        density="compact"
        :disabled="isMunicipio || isVerCliente"
        rounded="lg"
        variant="outlined"
        v-model="idDistrito"
        :items="distritos"
        item-title="nombre"
        item-value="id"
        no-data-text="No hay distritos disponibles"
        clearable
        @click:clear="limpiarCatalogos({ isDistrito: true })"
        @update:model-value="guardarDistrito"
        @update:search="searchDistrito"
        label="Distritos"
        :filter="() => true"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12">
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
        :disabled="isVerCliente"
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
import { useAlert } from "../composable/useAlert";
import { useCatalogos } from "../composable/useCatalagos";
import { getClientes } from "../services";

const props = defineProps({
  isGoback: {
    type: Boolean,
    default: false,
  },
  clienteData: {
    type: Object,
    default: {},
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
  isVerCliente:{
    type:Boolean,
    default:false
  }
});
const isPais = ref(true);
const idpais = ref();
const isDepartamento = ref(true);
const idDepartamento = ref();
const isMunicipio = ref(true);
const idMunicipio = ref();
const idDistrito = ref();
const alert = useAlert();
const isCliente = ref(false);
const clienteSeleccionado = ref(null);

// Envío del formulario
const {
  postCliente,
  updateCliente,
  cliente1,
  clientes,
  getClientes,
  getCliente,
} = useClientes();
const {
  paises,
  departamentos,
  municipios,
  distritos,
  paisesGet,
  derpatamentosGet,
  municipiosGet,
  distritosGet,
} = useCatalogos();
const emit = defineEmits(["update:addVentasDialog", "obtenerCliente"]);

// Para debounce
const goBack = computed({
  get: () => props.isGoback,
  set: (value) => emit("update:addVentasDialog", value),
});

let cliente = reactive<ClientesInterfaces>({
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
  if (!field.required.$response)
    errors.push("El número de registro es obligatorio");
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
  idpais.value = null;
  idDepartamento.value = null;
  idMunicipio.value = null;
  idDistrito.value = null;
};

const validateDocument = () => {
  const validate = aplicarMascara(cliente.nit);
  cliente.nit = validate;
};

async function submitForm() {
  const valid = await $v.value.$validate();  
  if (!valid) return false;

  if (props.isUpdated) {
    const response = await updateCliente(Number(cliente.id), cliente);
  
    if (response) {
      alert.show("Cliente actualizado correctamente");
      return true;
    }
  } else {
    const response = await postCliente(cliente);
    if (response?.data?.status == 200) {
      return true;
    }
  }
}

const buscarDepartamento = async (e?: any) => {
  idpais.value = Number(e);
  await derpatamentosGet(idpais.value);
  isPais.value = false;
};
const buscarTexto = async (texto: any) => {
  try {
    await paisesGet({ buscar: texto });
  } catch (error) {}
};
const buscarMunicipio = async (e: any) => {
  idDepartamento.value = Number(e);
  // Limpiamos el distrito seleccionado
  idDistrito.value = null;
  await municipiosGet(idDepartamento.value);
  isDepartamento.value = false;
};
const buscarTextoDepartamento = async (texto: any) => {
  await derpatamentosGet(idpais.value, { buscar: texto });
};
const buscarDistrito = async (e: any) => {
  idMunicipio.value = Number(e);
  await distritosGet(idMunicipio.value);
  isMunicipio.value = false;
};
const buscarTextoMunicipio = async (texto: any) => {
  await municipiosGet(idpais.value, { buscar: texto });
};
const buscarCliente = async (searchObj: any) => {};
const searchDistrito = async (texto: any) => {};

const guardarDistrito = async (e: any) => {
  cliente.idDistrito = Number(e);
};

// Cuando el usuario escribe algo (search)
const onSearchNombreComercial = async (value: string) => {
  // Siempre actualizamos el texto editable
  cliente.nombreComercial = value;

  // No buscar si menos de 3 letras
  if (!value || value.length < 3) return;

  try {
    await buscarCliente(value);

    // Si encontramos un cliente exacto
    if (cliente1?.value && cliente1.value.nombreComercial === value) {
      clienteSeleccionado.value = cliente1.value;

      // Solo autocompletar datos si estamos creando o si no estamos actualizando
      if (!props.isUpdated) {
        await onSelectNombreComercial(cliente1.value);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const onSelectNombreComercial = async (value: any) => {
  // Si no hay valor seleccionado
  if (!value) {
    if (!props.isUpdated) {
      // Solo limpiar si estamos creando un cliente nuevo
      limpiarCliente();
      cliente.nombreComercial =
        clienteSeleccionado.value?.nombreComercial ?? "";
    } else {
      // Estamos actualizando: NO borrar nada
      cliente.nombreComercial =
        clienteSeleccionado.value?.nombreComercial ?? cliente.nombreComercial;
    }
    return;
  }

  // value es un objeto de cliente existente
  cliente.id = value.id ?? null;
  cliente.nombre = value.nombre ?? cliente.nombre ?? "";
  cliente.apellido = value.apellido ?? cliente.apellido ?? "";
  cliente.dui = value.dui ?? cliente.dui ?? "";
  cliente.nit = value.nit ?? cliente.nit ?? "";
  cliente.nombreComercial = value.nombreComercial ?? cliente.nombreComercial ?? "";
  cliente.registro = value.nRegistro ?? value.registro ?? cliente.registro ?? "";
  cliente.email = value.email ?? cliente.email ?? "";
  cliente.direccion = value.direccion ?? cliente.direccion ?? "";
  cliente.telefono = value.telefono ?? cliente.telefono ?? "";
  idpais.value = value?.pais?.id ?? idpais.value ?? null;
  idDepartamento.value = value?.departamento?.id ?? idDepartamento.value ?? null;
  idMunicipio.value = value?.municipio?.id ?? idMunicipio.value ?? null;
  idDistrito.value = value?.distrito?.id ?? idDistrito.value ?? null;
  isDepartamento.value = false;
  isMunicipio.value = false;
  isPais.value = false;

  if (value?.pais?.id) {
    await derpatamentosGet(idpais.value, { buscar: idDepartamento.value });
    await municipiosGet(idDepartamento.value, { buscar: idMunicipio.value });
    await distritosGet(idMunicipio.value, { buscar: idDistrito.value });
  }
};

const limpiarCamposExceptoNombreComercial = () => {
  const nombreComercialTemp = cliente.nombreComercial;
  limpiarCliente();
  cliente.nombreComercial = nombreComercialTemp;
};
watch(goBack, (newValue) => {
  if (newValue) {
    $v.value.$reset();
    limpiarCliente();
  }
});

const limpiarCatalogos = (item: any) => {
  if (item.isPais) {
    isPais.value = true;
    idpais.value = null;
  }
  if (item.isPais || item.isDepartamento) {
    isDepartamento.value = true;
    idDepartamento.value = null;
  }
  if (item.isPais || item.isDepartamento || item.isMunicipio) {
    isMunicipio.value = true;
    idMunicipio.value = null;
  }
  if (
    item.isPais ||
    item.isDepartamento ||
    item.isMunicipio ||
    item.isDistrito
  ) {
    idDistrito.value = null;
  }
};

watch(
  () => props.clienteData,
  async (newValue) => {
    if (!newValue) return;

    if (cliente.id !== newValue.id) {
      Object.assign(cliente, {
        id: newValue.id,
        nombre: newValue.nombre,
        apellido: newValue.apellido,
        nombreComercial: newValue.nombre_comercial,
        dui: newValue.dui,
        nit: newValue.nit,
        email: newValue.email,
        idDistrito: newValue.distritos.id,
        registro: newValue.n_registro,
        telefono: newValue.telefono,
        direccion: newValue.direccion,
      });
      clienteSeleccionado.value = newValue.nombre_comercial;
      idpais.value = newValue.distritos.municipios.departamentos.pais.id;
      idDepartamento.value = newValue.distritos.municipios.departamentos.id;
      idMunicipio.value = newValue.distritos.municipios.id;
      idDistrito.value = newValue.distritos.id;
      isDepartamento.value = false;
      isMunicipio.value = false;
      isPais.value = false;
      await derpatamentosGet(idpais.value, { buscar: idDepartamento.value });
      await municipiosGet(idDepartamento.value, { buscar: idMunicipio.value });
      await distritosGet(idMunicipio.value, { buscar: idDistrito.value });
    }
  },
  { deep: false, immediate: true }
);

onMounted(async () => {
  try {
    await paisesGet();
    await getClientes(1);
  } catch (error) {
    console.error("Error cargando clientes:", error);
  }
});

// Limpiar timeout cuando el componente se desmonte
onUnmounted(() => {});
defineExpose({
  cliente,
  submitForm,
  $v,
});
</script>
