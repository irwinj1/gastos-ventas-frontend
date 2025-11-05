<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-center">
                <span class="font-weight-black text-h4">Clientes</span>
            </v-col>
            <v-col cols="12" md="10" sm="12">
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field variant="outlined" density="compact" v-model="buscar" label="Buscar"
                            @input="searchClient" clearable @click:clear="cargarClientes(1)"></v-text-field>
                    </v-col>

                </v-row>
            </v-col>
            <v-col cols="12" md="2" sm="12" class="text-end justify-end ">
                <v-btn rounded="lg" color="grey-darken-4 text-none"
                    @click="$router.push({ name: 'addCliente' })">Agregar</v-btn>
            </v-col>
        </v-row>

        <table-component :headers="headers" :items="clientes" :pagination="pagination?.last_page"
            :per-page="pagination?.per_page" :mostrar-paginacion="true" @update:page="updatePage">
            <template v-slot:[`item.nombre`]="{ item }">
                <span>{{ item.nombre ?? '-' }}</span>
            </template>
            <template v-slot:[`item.apellido`]="{ item }">
                <span>{{ item.apellido ?? '-' }}</span>
            </template>
            <template v-slot:[`item.acciones`]="{ item }">
                <v-row>
                    <v-tooltip text="Ver cliente" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" density="compact" icon="mdi-eye-outline" elevation="0"
                                @click="verCliente(item)"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Editar cliente" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" density="compact" icon="mdi-pencil-outline" elevation="0"
                                @click="editarCliente(item)"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Eliminar cliente" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" density="compact" icon="mdi-delete-outline" elevation="0"
                                @click="eliminarCliente(item)"></v-btn>
                        </template>
                    </v-tooltip>
                </v-row>
            </template>
        </table-component>

        <dialog-modal-component :dialog="dialog" :eliminar-cliente="eliminarCliente" :titulo="titulo" :message="message"
            :sub-message="submessage" @aceptar-evento="deleteClient" @close-dialog="closeDialog">

        </dialog-modal-component>
    </v-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TableComponent from '../../components/TableComponent.vue';
import { useClientes } from './composable/useClientes';
import type { ClientesInterfaces } from '../../interfaces';
import DialogModalComponent from '../../components/DialogModalComponent.vue';
import { useRouter } from 'vue-router';
import { useAlert } from '../../composable/useAlert';

const { headers, items, clientes, getClientes, pagination, eliminarClientes } = useClientes()
const dialog = ref<boolean>(false)
const verDialog = ref<boolean>(false)
const editDialog = ref<boolean>(false)
const eliminarDialog = ref<boolean>(false)
const message = ref<string>('')
const submessage = ref<string>('')
const titulo = ref<string>('')
const router = useRouter()
const buscar = ref<any>(null)
const idClient = ref<Number>(0)
const alert = useAlert();


const cargarClientes = async (page: number, params?: any) => {
    try {
        await getClientes(page, params)
    } catch (error) {

    }
}

const updatePage = async (page: number, params?: any) => {
    try {

        await cargarClientes(page, params)
    } catch (error) {

    }
}
const verCliente = async (item: ClientesInterfaces) => {
    try {
console.log(item);
        router.push({'name':'verCliente',params:{id:item.id}})
    } catch (error) {

    }
}
const editarCliente = async (item: ClientesInterfaces) => {
    try {
        router.push({ name: "updateCliente",params:{id:item.id} })
    } catch (error) {

    }
}
const eliminarCliente = async (item: ClientesInterfaces) => {
    try {
        dialog.value = true
        eliminarDialog.value = true
        titulo.value = "Eliminar cliente"
        message.value = "Se eliminara el cliente selecionado"
        submessage.value = "¿Esta seguro eliminar el cliente?"
        console.log(item.id);
        idClient.value = Number(item?.id)

    } catch (error) {

    }
}
const closeDialog = () => {
    dialog.value = false
}
const searchClient = async () => {
    try {
        await updatePage(1, { "buscar": buscar.value })
    } catch (error) {

    }
}

const deleteClient = async () => {
    try {
        await eliminarClientes(idClient.value)
        closeDialog()

    } catch (error) {

        alert.show("Error al eliminar la alerta", "error")
    } finally {
        await cargarClientes(1)
    }
}

onMounted(async () => {
    try {
        await cargarClientes(1)

    } catch (error) {
        console.error(error);

    }
})
</script>