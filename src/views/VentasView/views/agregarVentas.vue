<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-btn class="text-none" @click="$router.back()">Regresar</v-btn>
      </v-col>
      <v-col cols="12" md="8" class="text-h4 font-weight-bold text-center">
        <p>Agregar venta</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-center text-caption">Cliente</div>
        <v-card :variant="'outlined'" color="surface-variant" label="Cliente">
          <v-card-item>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="text-end">
                  <v-tooltip v-model="show" location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        icon
                        v-bind="props"
                        density="compact"
                        elevation="0"
                        color="grey-darken-4"
                        @click="closeDialog"
                      >
                        <v-icon color="grey-lighten-1"> mdi-plus </v-icon>
                      </v-btn>
                    </template>
                    <span>Agregar cliente</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <v-combobox
                    density="compact"
                    label="Nombre comercial"
                    variant="outlined"
                    :items="clientes"
                    item-title="nombreComercial"
                    item-value="id"
                    :rounded="'lg'"
                    @update:model-value="onChangeCliente"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Dui"
                    :model-value="cliente.dui"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Nit"
                    :model-value="cliente.nit"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Registro"
                    :model-value="cliente.registro"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="12">
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    label="Dirección"
                    :model-value="cliente.direccion"
                    disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col>
        <div class="text-center text-caption">Detalle factura</div>
        <v-card
          :variant="'outlined'"
          color="surface-variant"
          label="Detalle factura"
        >
          <v-card-item>
            <v-card-text>
              <v-col cols="12">
                <v-btn
                  class="text-none"
                  @click="agregarDetalles"
                  color="grey-darken-4"
                  :disabled="!cliente.id"
                  >Agregar detalle venta</v-btn
                >
              </v-col>
              <v-col cols="12">
                <table-component :headers="headers" :items="items">
                  <template v-slot:[`item.precioUnitario`]="{ item }">
                    <span>{{ formatter.format(item.precioUnitario) }}</span>
                  </template>
                  <template v-slot:[`item.total`]="{ item }">
                    <span>{{ formatter.format(item.total) }}</span>
                  </template>
                  <template v-slot:[`item.image`]="{ item }">
                    <span>{{ item.image?.name }}</span>
                  </template>
                  <template v-slot:[`item.acciones`]="{ item }">
                    <v-row>
                      <v-btn
                        density="compact"
                        icon="mdi-delete-outline"
                        elevation="0"
                        @click="eliminarItem(item)"
                      ></v-btn>
                    </v-row>
                  </template>
                </table-component>
              </v-col>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="12">

        <div class="text-center text-caption">Archivo factura</div>
        <v-card
          :variant="'outlined'"
          color="surface-variant"
          label="Detalle factura"
        >
          <v-card-item>
            <v-card-text>
              <v-file-input
                variant="outlined"
                density="compact"
                label="Imagen"
                rounded="lg"
                @update:model-value="onImageChange"
              ></v-file-input>
            </v-card-text>
          </v-card-item>
          </v-card>
            </v-col>
    </v-row>
    <modal-agregar-ventas
      :add-ventas-dialog="addDialogVentas"
      @update:add-ventas-dialog="closeDialog"
      @obtener-cliente="obtenerClientes"
    ></modal-agregar-ventas>
    <modal-agregar-detalle-ventas
      :add-detalle-venta="dialogDetail"
      @update:add-detalle-ventas-dialog="AddDetalleVentas"
      @guardar-detalle="guardarDetalle"
    ></modal-agregar-detalle-ventas>
    <v-tooltip text="Guardar factura" location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          color="grey-darken-4"
          class="fab-button"
          icon
          @click="guardarVenta"
          :disabled="items.length == 0"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-container>
  <loadign-component :overlay="overlay" />
</template>
<script setup lang="ts">
import TableComponent from "../../../components/TableComponent.vue";
import ModalAgregarVentas from "../components/ModalAgregarCliente.vue";
import ModalAgregarDetalleVentas from "../components/ModalAgregarDetalleVentas.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useClientes } from "../composables/useClientes";
import { useVentas } from "../composables/useVentas";
import { ClientesInterfaces } from "../../../interfaces";
import LoadignComponent from "../../../components/LoadignComponent.vue";

const show = ref(false);
const router = useRouter();
const addDialogVentas = ref<Boolean>(false);

const { clientes, getClientes, getCliente, cliente1 } = useClientes();
const {createVenta} = useVentas()
const dialogDetail = ref(false);
const imageVenta = ref(null)
const headers = ref([
  {
    title: "Descripcion",
    align: "start",
    key: "descripcion",
    class: "header-backgroud",
  },
  {
    title: "Cantidad",
    align: "start",
    key: "cantidad",
    class: "header-backgroud",
  },
  {
    title: "Precio unitario",
    align: "start",
    key: "precioUnitario",
    class: "header-backgroud",
  },
  {
    title: "Ventas afectadas",
    align: "start",
    key: "total",
  },
  {
    title: "Imagen",
    align: "start",
    key: "image",
  },
  {
    title: "Acciones",
    align: "start",
    key: "acciones",
  },
]);
const overlay = ref<boolean>(false)
let items = reactive<string[]>([]);
const getClientess = async (params: any) => {
  try {
    await getClientes(params);
  } catch (error) {}
};
const cliente = reactive<ClientesInterfaces>({
  nombre: "",
  dui: "",
  nit: "",
  registro: "",
  direccion: "",
});

const irAtras = () => {
  router.back();
};

const closeDialog = () => {
  addDialogVentas.value = !addDialogVentas.value;
};
const onChangeCliente = async (value: any) => {
  try {
    await getCliente(value.id);
    console.log(value);
    
    cliente.id = cliente1.value?.id;
    cliente.nombre = cliente1.value?.nombreComercial;
    cliente.nit = cliente1.value?.nit;
    cliente.dui = cliente1.value?.dui;
    cliente.direccion = cliente1.value?.direccion;
    cliente.registro = cliente1.value?.n_registro;
console.log(cliente);

  } catch (error) {
    console.error(error);
  }
};

const agregarDetalles = () => {
  dialogDetail.value = !dialogDetail.value;
};

const AddDetalleVentas = () => {
  dialogDetail.value = !dialogDetail.value;
};
const guardarDetalle = (detalle: any) => {
  try {
    items.push(detalle);
  } catch (error) {
    console.error(error);
  }
};
const formatter = new Intl.NumberFormat("es-SV", {
  style: "currency",
  currency: "USD", // si quieres ¢ cambia a 'SVC' si tu locale lo soporta
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const eliminarItem = (item: any) => {
  const itemFind = items.findIndex((it) => it == item);
  items.splice(itemFind, 1);
};

const guardarVenta = async() => {
 
  try {
    overlay.value=true
    const obj= {
        clienteId:cliente.id,
        detalleVentas:items,
        image:imageVenta.value
    }
    
    await createVenta(obj)
  } catch (error) {
    console.error(error);
    
  }finally{
    overlay.value=false
    router.push({name:"ventas"})
  }
};
const onImageChange = (e: any) => {
  imageVenta.value = e
};
const obtenerClientes = async()=>{
  await getClientess({ esCliente: 1 });
}
onMounted(async () => {
  await getClientess({ esCliente: 1 });
});
</script>
<style scoped>
.fab-button {
  position: fixed;
  bottom: 70px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
