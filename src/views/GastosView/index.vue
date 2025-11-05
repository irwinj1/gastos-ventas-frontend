<template>
    <v-container>
        <v-row>
            <v-col >
                <p class="text-h4 font-weight-bold">Gastos</p>
            </v-col>
        </v-row>
        <table-component :headers="headers"></table-component>
    </v-container>
</template>
<script setup lang="ts">
import TableComponent from '../../components/TableComponent.vue';
import { useGastos } from './composable/useGatos';

const {headers} = useGastos()
</script>