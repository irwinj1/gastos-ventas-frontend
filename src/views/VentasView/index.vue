<template>
    <v-container>
        <v-row>
            <v-col >
                <p class="text-h4 font-weight-bold">Ventas</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-row>
                    <v-col cols="12" md="9" sm="12">
                        <v-text-field density="compact" label="Buscar" variant="outlined" clearable ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" sm="12">
                        <v-btn class="text-none" color="grey-darken-4">buscar</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col class="text-end">
                <v-btn class="text-none" color="grey-darken-4" @click="irVenta">Agregar</v-btn>
            </v-col>
        </v-row>
        <table-component :headers="headers" :items="items" :mostrar-paginacion="true"
            :pagination="pagination?.last_page" :per-page="pagination?.per_page" @update:page="updatePage">
            <template v-slot:[`item.checkbox`]="{ item }">
                <v-checkbox v-model="selected" :value="item.id" density="compact"></v-checkbox>
            </template>

            <template v-slot:[`item.total`]="{ item }">
                <span>{{ formatter.format(item.total) }}</span>
            </template>
            <template v-slot:[`item.acciones`]="{ item }">
                <v-row>
                    <v-btn density="compact" icon="mdi-eye-outline" elevation="0"></v-btn>
                    <v-btn density="compact" icon="mdi-pencil-outline" elevation="0"></v-btn>
                    <v-btn density="compact" icon="mdi-delete-outline" elevation="0"></v-btn>
                </v-row>
            </template>
        </table-component>
     
    </v-container>
</template>
<script setup lang="ts">
import TableComponent from '../../components/TableComponent.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useVentas } from './composables/useVentas';
const { pagination, ventas, cargarVentas } = useVentas()

const headers = ref([
    {
        title: '',
        align: 'start',
        key: 'checkbox',
        class:'header-backgroud'
    },
    {
        title: 'Id',
        align: 'start',
        key: 'id',
    },

    {
        title: 'Cliente',
        align: 'start',
        key: 'cliente.nombre',
    },
    {
        title: 'Total',
        align: 'start',
        key: 'total',
    },
    {
        title: 'Acciones',
        align: 'start',
        key: 'acciones'
    }
])
const router = useRouter()
const items = ref<typeof ventas.value>([]);
const perPage = ref<number>(10)
const selected = ref<number[]>([])
const formatter = new Intl.NumberFormat('es-SV', {
    style: 'currency',
    currency: 'USD', // si quieres ¢ cambia a 'SVC' si tu locale lo soporta
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const updatePage = (page: number) => {
    console.log(page);

}
const irVenta = ()=>{

    router.push({name:'agregar-venta'})
}

onMounted(async () => {
    await cargarVentas()
    perPage.value = pagination?.value.per_page;
    items.value = ventas.value

    selected.value.push(1)

})
</script>
