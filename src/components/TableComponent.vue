<template>
    <v-row>
        <v-data-table :headers="props.headers" :items="props.items" item-key="name" hide-default-footer>

            <template v-for="header in headers" v-slot:[`item.${header.key}`]="{ item, index }">
                <slot :name="`item.${header.key}`" :item="item" :index="index">
                    <span v-if="header.key === 'id'">
                        {{ (currentPage - 1) * perPage + index + 1 }}
                    </span>
                    <span v-else>{{ getItemValue(item, header.key) }}</span>
                </slot>
            </template>
        </v-data-table>

    </v-row>
    <div class="text-center">
        <v-pagination :length="pagination || 1" v-model="currentPage" @update:model-value="onPageChange"
            v-if="mostrarPaginacion"> </v-pagination>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Header {
    title: string
    key: string
    align?: string
}

interface Props {
    headers: Header[]
    items: any[]
    pagination?: number
    perPage?: number
    mostrarPaginacion: boolean
}
const props = defineProps<Props>()
function getItemValue(item: any, key: string) {
    return key.split('.').reduce((acc, part) => acc && acc[part], item)
}

const emit = defineEmits<{
    (e: 'update:page', page: number): void
}>()
const currentPage = ref(1)

const onPageChange = (page: number) => {
    currentPage.value = page
    emit('update:page', page)
}
</script>