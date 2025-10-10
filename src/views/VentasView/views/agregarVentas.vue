<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="text-h4 font-weight-bold text-center">
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
                                    <v-tooltip
                                        v-model="show"
                                        location="bottom"
                                        >
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                            icon
                                            v-bind="props"
                                            density="compact"
                                            elevation="0"
                                            color="grey-darken-4"
                                            @click="closeDialog"
                                            >
                                            <v-icon color="grey-lighten-1">
                                                mdi-plus
                                            </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Agregar cliente</span>
                                    </v-tooltip>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-autocomplete density="compact" label="Nombre" variant="outlined"
                                        :rounded="'lg'"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Dui"
                                        :model-value="'04154516-6'" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" sm="12">
                                    <v-text-field density="compact" variant="outlined" label="Nit"
                                        disabled></v-text-field>
                                </v-col>
                                <!-- <v-col cols="12" md="4" sm="12">
                            <v-text-field density="compact" variant="outlined" label="Dui" disabled></v-text-field>
                        </v-col> 
                        <v-col cols="12" md="4" sm="12">
                            <v-text-field density="compact" variant="outlined" label="Dui" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="12">
                            <v-text-field density="compact" variant="outlined" label="Dui" disabled></v-text-field>
                        </v-col> -->

                            </v-row>
                        </v-card-text>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
        </v-row>
        <modal-agregar-ventas :add-ventas-dialog="addDialogVentas" @update:add-ventas-dialog="closeDialog"></modal-agregar-ventas>
    </v-container>
</template>
<script setup lang="ts">
import ModalAgregarVentas from '../components/ModalAgregarCliente.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'

  const show = ref(false)
const router = useRouter()
const addDialogVentas = ref<Boolean>(false)

const irAtras = () => {
    router.back()
}
const closeDialog = ()=>{
    addDialogVentas.value = !addDialogVentas.value
}
</script>