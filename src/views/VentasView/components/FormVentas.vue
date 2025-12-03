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
        <v-row >
            <v-col cols="12">
                <div class="text-center text-caption">Cliente</div>
                <v-card :variant="'outlined'" color="surface-variant" label="Cliente">
                    <v-card-item>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" class="text-end">
                                    <v-tooltip v-model="show" location="bottom">
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon v-bind="props" density="compact" elevation="0"
                                                color="grey-darken-4" @click="closeDialog">
                                                <v-icon color="grey-lighten-1"> mdi-plus </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Agregar cliente</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field v-if="isVer" density="compact" variant="outlined"
                                        label="Nombre comercial" :model-value="venta?.cliente?.nombreComercial"
                                        disabled></v-text-field>
                                    <v-combobox density="compact" v-model="clienteSeleccionado" label="Nombre comercial"
                                        variant="outlined" :items="clientes" v-if="props.isEditar"
                                        item-title="nombreComercial" item-value="id" :rounded="'lg'"
                                        @update:model-value="onChangeCliente"></v-combobox>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Dui"
                                        :model-value="cliente.dui" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Nit"
                                        :model-value="cliente.nit" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Registro"
                                        :model-value="cliente.registro" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Dirección"
                                        :model-value="cliente.direccion" disabled></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-col>

            <v-col >
                <div class="text-center text-caption">Detalle factura</div>
                <v-card :variant="'outlined'" color="surface-variant" label="Detalle factura">
                    <v-card-item>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                <v-btn class="text-none text-wrap" @click="agregarDetalles" colo
                                    :disabled="!venta?.cliente?.id" v-if="isEditar">Agregar
                                    detalle venta</v-btn>
                            </v-col>
                            <v-col cols="12">
                                <table-component :headers="headers" :items="items">
                                    <template v-slot:[`item.precioUnitario`]="{ item }">
                                        <span>{{ formatter.format(item.precioUnitario) }}</span>
                                    </template>
                                    <template v-slot:[`item.ventasAfectadas`]="{ item }">
                                        <span>{{ formatter.format(item.ventasAfectadas) }}</span>
                                    </template>

                                    <template v-slot:[`item.acciones`]="{ item }">
                                        <v-row>
                                            <v-btn density="compact" icon="mdi-delete-outline" elevation="0"
                                                @click="eliminarItem(item)"></v-btn>
                                        </v-row>
                                    </template>
                                </table-component>
                            </v-col>
                            </v-row>                          
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="margin-bottom: 80px;">

<div class="text-center text-caption">Archivo factura</div>
<v-card :variant="'outlined'" color="surface-variant" label="Detalle factura">
    <v-card-item>
        <v-card-text>
            <div v-if="props.isVer" class="mb-4">
                <v-row align="center" justify="space-between">
                    <v-col cols="12" sm="6">
                        <v-text-field label="Archivo actual"
                            :model-value="venta?.archivos.nombrearchivo"
                            variant="outlined" density="compact" readonly
                            append-inner-icon="mdi-paperclip"></v-text-field>
                    </v-col>

                    <!-- Botón para ver imagen -->
                    <v-col cols="12" sm="6" class="text-center">
                        <v-img
                            :src="`data:image/${venta?.archivos?.extension};base64,${venta?.archivos?.img}`"
                            max-width="200"
                            class="mx-auto rounded-lg elevation-2"></v-img>
                    </v-col>
                </v-row>
            </div>
            <v-file-input v-if="props.isEditar" variant="outlined" density="compact" 
                label="Imagen" rounded="lg" v-model="imageVenta"
                @update:model-value="onImageChange"></v-file-input>
                <span>{{ archivoExiste?.nombrearchivo }}</span>
            <v-col cols="11" sm="5">
                <v-text-field :model-value="fechaFacturacionFormated" :disabled="isVer"
                    label="Fecha de facturación" density="compact" variant="outlined"
                    append-inner-icon="mdi-calendar-outline" readonly>
                    <v-menu v-model="showMenu" :close-on-content-click="false"
                        activator="parent" min-width="0">
                        <v-date-picker v-model="fechaFacturacion"></v-date-picker>
                    </v-menu>
                </v-text-field>
            </v-col>
        </v-card-text>
    </v-card-item>
</v-card>
</v-col>

        </v-row>
        <modal-agregar-ventas :add-ventas-dialog="addDialogVentas" @update:add-ventas-dialog="closeDialog"
            @obtener-cliente="obtenerClientes"></modal-agregar-ventas>
        <modal-agregar-detalle-ventas :add-detalle-venta="dialogDetail"
            @update:add-detalle-ventas-dialog="AddDetalleVentas"
            @guardar-detalle="guardarDetalle"></modal-agregar-detalle-ventas>
        <v-tooltip text="Actualizar factura" location="bottom" v-if="isEditar" >
            <template #activator="{ props }">
                <v-btn v-bind="props" color="grey-darken-4" class="fab-button" icon @click="guardarVenta"
                    :disabled="items.length == 0">
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
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useClientes } from "../composables/useClientes";
import { useVentas } from "../composables/useVentas";
import type { ClientesInterfaces, DetalleVenta, VentaInterfaces } from "../../../interfaces";
import LoadignComponent from "../../../components/LoadignComponent.vue";
const props = defineProps({

    isVer: {
        type: Boolean,
        default: false
    },
    isEditar: {
        type: Boolean,
        default: false
    }
})

const show = ref(false);
const router = useRouter();
const routes = useRoute()
const addDialogVentas = ref<Boolean>(false);

const { clientes, getClientes, getCliente, cliente1 } = useClientes();
const { createVenta, getVentaID, venta } = useVentas()
const dialogDetail = ref(false);
const imageVenta = ref(null)
const fechaFacturacion = ref(null)
const showMenu = ref(false)
const clienteSeleccionado = ref(null)
const archivoExiste = ref(null)
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
        key: "ventasAfectadas",
    },


]);
const overlay = ref<boolean>(false)
let items = ref<DetalleVenta[]>([]);
const getClientess = async (params: any) => {
    try {
        await getClientes(params);
    } catch (error) { }
};
const cliente = reactive<ClientesInterfaces>({
    nombre: "",
    dui: "",
    nit: "",
    registro: "",
    direccion: "",
});

const fechaFacturacionFormated = computed(() => {
    if (!fechaFacturacion.value) return "";
    return formatedFechas(fechaFacturacion.value);
});

const formatedFechas = (fecha: any) => {
    const dateObj = new Date(fecha);
    const dia = dateObj.getDate().toString().padStart(2, "0");
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const anio = dateObj.getFullYear();
    return `${dia}/${mes}/${anio}`;
};
const closeDialog = () => {
    addDialogVentas.value = !addDialogVentas.value;
};
const onChangeCliente = async (value: any) => {
    try {
        await getCliente(value.id);

        cliente.id = cliente1.value?.id;
        cliente.nombre = cliente1.value?.nombreComercial;
        cliente.nit = cliente1.value?.nit;
        cliente.dui = cliente1.value?.dui;
        cliente.direccion = cliente1.value?.direccion;
        cliente.registro = cliente1.value?.n_registro;

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

const guardarVenta = async () => {

    try {
        overlay.value = true
        const obj = {
            clienteId: cliente.id,
            detalleVentas: items,
            image: imageVenta.value,
            fechaFactura: fechaFacturacion.value
        }

        await createVenta(obj)
    } catch (error) {
        console.error(error);

    } finally {
        overlay.value = false
        router.push({ name: "ventas" })
    }
};
const onImageChange = (e: any) => {
    imageVenta.value = e    
    archivoExiste.value = {
        nombreArchivo : e.name
    }
};
const obtenerClientes = async () => {
    await getClientess({ esCliente: 1 });
}
const obtenerVenta = async () => {
    await getVentaID(Number(routes.params.id))
    items.value = venta.value?.detalleVenta

    fechaFacturacion.value = venta.value?.fechaFactura || null
    cliente.dui = venta.value?.cliente?.dui || null
    cliente.nit = venta.value?.cliente.nit || null
    cliente.registro = venta.value?.cliente?.registro || null
    cliente.direccion = venta.value?.cliente?.direccion || null
    await onChangeCliente(venta.value?.cliente)
    clienteSeleccionado.value = venta.value?.cliente
    archivoExiste.value = venta.value?.archivos

}
onMounted(async () => {
    if (!props.isVer) {
        headers.value = [...headers.value, {
            title: "Acciones",
            align: "start",
            key: "acciones",
        },]
    }
    await getClientess({ esCliente: 1 });
    await obtenerVenta()

});
</script>
<style scoped>
.fab-button {
    position: fixed;
    bottom: 90px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>