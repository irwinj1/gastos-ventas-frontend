<template>
  <v-dialog v-model="modelValue" width="auto" persistent>
    <v-card
      prepend-icon="mdi-account"
      title="Detalle venta"
      width="700"
      rounded="xl"
    >
      <v-form @submit.prevent="agregarDetalle" ref="vForm">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-textarea
                v-model="detalleVenta.descripcion"
                variant="outlined"
                label="Descripción"
                rows="1"
                density="compact"
                rounded="lg"
                @blur="$v.descripcion.$touch"
                :error="$v.descripcion.$error"
                :error-messages="descripcionError"
              ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detalleVenta.cantidad"
                variant="outlined"
                label="Cantidad"
                density="compact"
                rounded="lg"
                type="number"
                min="0"
                @blur="$v.cantidad.$touch()"
                :error="$v.cantidad.$error"
                :error-messages="cantidadError"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="detalleVenta.precioUnitario"
                variant="outlined"
                label="Precio unitario"
                density="compact"
                rounded="lg"
                type="number"
                min="0"
                step="0.01"
                @blur="$v.precioUnitario.$touch"
                :error="$v.precioUnitario.$error"
                :error-messages="precioUnitarioError"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :model-value="totalVentasAfectadas"
                variant="outlined"
                label="Total"
                density="compact"
                rounded="lg"
                type="number"
                disabled
                hint="Calculado automáticamente"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                variant="outlined"
                density="compact"
                label="Imagen"
                rounded="lg"
                @update:model-value="onImageChange"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
            text="Cancelar"
            variant="outlined"
            rounded="lg"
            class="text-none"
            @click="cerrarDialogo"
          />
          <v-btn
            color="grey-darken-4"
            text="Guardar"
            variant="elevated"
            rounded="lg"
            class="text-none"
            type="submit"
            :loading="loading"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <loading-component :overlay="loading" />
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, numeric, minValue } from "@vuelidate/validators";

const props = defineProps({
  addDetalleVenta: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const emit = defineEmits(["update:addDetalleVentasDialog", "guardarDetalle"]);

interface DetalleVenta {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  image: File | null; // archivo cargado
}

const detalleVenta = reactive<DetalleVenta>({
  descripcion: "",
  cantidad: 0,
  precioUnitario: 0,
  image: null,
});

// Reglas de validación mejoradas
const rules = {
  descripcion: { required },
  cantidad: {
    required,
    numeric,
    minValue: minValue(0.01), // Evitar cantidades cero o negativas
  },
  precioUnitario: {
    required,
    numeric,
    minValue: minValue(0), // Precio puede ser cero pero no negativo
  },
};

const $v = useVuelidate(rules, detalleVenta);

// Mensajes de error mejorados
const descripcionError = computed(() => {
  const errors: string[] = [];
  const field = $v.value.descripcion;
  if (!field.$dirty) return errors;
  if (field.required.$invalid) errors.push("La descripción es obligatoria");
  return errors;
});

const cantidadError = computed(() => {
  const errors: string[] = [];
  const field = $v.value.cantidad;
  if (!field.$dirty) return errors;
  if (field.required.$invalid) errors.push("La cantidad es obligatoria");
  if (field.numeric.$invalid) errors.push("La cantidad debe ser numérica");
  if (field.minValue.$invalid) errors.push("La cantidad debe ser mayor a 0");
  return errors;
});

const precioUnitarioError = computed(() => {
  const errors: string[] = [];
  const field = $v.value.precioUnitario;
  if (!field.$dirty) return errors;
  if (field.required.$invalid) errors.push("El precio unitario es obligatorio");
  if (field.numeric.$invalid)
    errors.push("El precio unitario debe ser un número");
  if (field.minValue.$invalid) errors.push("El precio no puede ser negativo");
  return errors;
});

// Total calculado automáticamente
const totalVentasAfectadas = computed(() => {
  return (detalleVenta.cantidad * detalleVenta.precioUnitario).toFixed(2);
});

const loading = ref(false);

// Control del diálogo
const modelValue = computed({
  get: () => props.addDetalleVenta,
  set: (value) => emit("update:addDetalleVentasDialog", value),
});

const limpiarDatos = () => {
  detalleVenta.cantidad = 0;
  detalleVenta.descripcion = "";
  detalleVenta.precioUnitario = 0;
};

const cerrarDialogo = () => {
  try {
    modelValue.value = false;
    $v.value.$reset();
    limpiarDatos();
  } catch (error) {
    console.error("Error al cerrar diálogo:", error);
  }
};

const agregarDetalle = async () => {
  // Validar todos los campos
  $v.value.$touch();

  if ($v.value.$invalid) {
    return;
  }

  loading.value = true;

  try {
    // Crear objeto con los datos del detalle
    const detalle = {
      descripcion: detalleVenta.descripcion,
      cantidad: detalleVenta.cantidad,
      precioUnitario: detalleVenta.precioUnitario,
      total: parseFloat(totalVentasAfectadas.value),
      image: detalleVenta.image
    };

    // Emitir evento con los datos del detalle
    emit("guardarDetalle", detalle);

    // Cerrar diálogo y limpiar
    cerrarDialogo();
  } catch (error) {
    console.error("Error al agregar detalle:", error);
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    loading.value = false;
  }
};

const onImageChange = (e: any) => {
  detalleVenta.image = e
};

// Opcional: Limpiar datos cuando se abre el diálogo
watch(modelValue, (newValue) => {
  if (newValue) {
    // Resetear validaciones y limpiar datos cuando se abre
    setTimeout(() => {
      $v.value.$reset();
      limpiarDatos();
    }, 100);
  }
});
</script>
