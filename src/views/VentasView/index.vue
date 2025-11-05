<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="text-h4 font-weight-bold">Ventas</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              v-model="buscar"
              density="compact"
              label="Buscar"
              variant="outlined"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3" sm="12">
            <v-text-field
              :model-value="fechaDesdeFormated"
              label="Fecha desde"
              rounded="lg"
              variant="outlined"
              density="compact"
              append-inner-icon="mdi-clock-time-four-outline"
              readonly
            >
              <v-menu
                v-model="showDesde"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
              >
                <v-date-picker v-model="fechaDesde" hide-header></v-date-picker>
              </v-menu>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <v-text-field
              :model-value="fechaHastaFormated"
              label="Fecha hasta"
              rounded="lg"
              variant="outlined"
              density="compact"
              append-inner-icon="mdi-clock-time-four-outline"
              readonly
            >
              <v-menu
                v-model="showHasta"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
              >
                <v-date-picker v-model="fechaHasta" hide-header></v-date-picker>
              </v-menu>
            </v-text-field>
          </v-col>
          
          <v-col cols="12" md="3" sm="12">
            <v-btn class="text-none" color="grey-darken-4" @click="buscarVentas"
              >buscar</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="text-end">
  <v-row justify="end" align="center" no-gutters>
    <v-col cols="auto">
      <v-btn
        class="text-none"
        color="grey-darken-4"
        width="120"
        :disabled="selected.length === 0"
        @click="descargarPDF"
      >
        Descargar
      </v-btn>
    </v-col>

    <v-col cols="auto" class="ml-2">
      <v-btn
        class="text-none"
        color="grey-darken-4"
        width="120"
        @click="irVenta"
      >
        Agregar
      </v-btn>
    </v-col>
  </v-row>
</v-col>
    </v-row>
    <table-component
      :headers="headers"
      :items="ventas"
      :mostrar-paginacion="true"
      :pagination="pagination?.last_page"
      :per-page="pagination?.per_page"
      @update:page="updatePage"
    >
      <template v-slot:[`item.checkbox`]="{ item }">
        <v-checkbox
          v-model="selected"
          :value="item.id"
          density="compact"
        ></v-checkbox>
      </template>

      <template v-slot:[`item.total`]="{ item }">
        <span>{{ formatter.format(item.total) }}</span>
      </template>
      <template v-slot:[`item.acciones`]="{ item }">
        <v-row>
          <v-btn density="compact" icon="mdi-eye-outline" elevation="0"></v-btn>
          <v-btn
            density="compact"
            icon="mdi-pencil-outline"
            elevation="0"
          ></v-btn>
          <v-btn
            density="compact"
            icon="mdi-delete-outline"
            elevation="0"
            @click="eliminarVenta(item)"
          ></v-btn>
        </v-row>
      </template>
    </table-component>
  </v-container>
</template>
<script setup lang="ts">
import TableComponent from "../../components/TableComponent.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useVentas } from "./composables/useVentas";
import type { ClientesInterfaces } from "../../interfaces";
const { pagination, ventas, cargarVentas } = useVentas();

const headers = ref([
  {
    title: "",
    align: "start",
    key: "checkbox",
    class: "header-backgroud",
    headerProps: { style: "width:5%" },
  },
  {
    title: "Id",
    align: "start",
    key: "id",
  },

  {
    title: "Cliente",
    align: "start",
    key: "cliente.nombre",
  },
  {
    title: "Total",
    align: "start",
    key: "total",
  },
  {
    title: "Acciones",
    align: "start",
    key: "acciones",
    headerProps: { style: "width:15%" },
  },
]);
const showDesde = ref<Boolean>(false);
const fechaDesde = ref<any>(null);
const showHasta = ref<Boolean>(false);
const fechaHasta = ref<any>(null);
const buscar = ref<any>(null);
const router = useRouter();
const date = new Date();

const selected = ref<number[]>([]);
const formatter = new Intl.NumberFormat("es-SV", {
  style: "currency",
  currency: "USD", // si quieres ¢ cambia a 'SVC' si tu locale lo soporta
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fechaDesdeFormated = computed(() => {
  if (!fechaDesde.value) return "";
  return formatedFechas(fechaDesde.value);
});
const fechaHastaFormated = computed(() => {
  if (!fechaHasta.value) return "";
  return formatedFechas(fechaHasta.value);
});
const formatedFechas = (fecha: any) => {
  const dateObj = new Date(fecha);
  const dia = dateObj.getDate().toString().padStart(2, "0");
  const mes = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const anio = dateObj.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

const updatePage = async (page: number) => {
  try {
    await getVentas(page);
  } catch (error) {}
};

const getVentas = async (page: number, params?: any) => {
  try {
    await cargarVentas(page, params);
  } catch (error) {}
};
const buscarVentas = async (page: number) => {
  try {
    
    await cargarVentas(1, {
      fechaDesde: fechaDesde.value,
      fechaHasta: fechaHasta.value,
      buscar: buscar.value,
    });
  } catch (error) {}
};
const irVenta = () => {
  router.push({ name: "agregar-venta" });
};
const eliminarVenta = (item: ClientesInterfaces) => {
  try {
  } catch (error) {}
};
const descargarPDF = () => {
  console.log(selected);
};

onMounted(async () => {
  await getVentas(1);
});
</script>
