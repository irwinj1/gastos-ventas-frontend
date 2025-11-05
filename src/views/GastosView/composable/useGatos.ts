import { ref } from "vue";

export function useGastos(){
    const headers = ref([
        {
            title: '',
            align: 'start',
            key: 'checkbox',
            class:'header-backgroud',
            headerProps: { style: 'width:5%' }
        },
        {
            title: 'Id',
            align: 'start',
            key: 'id',
        },
    
        {
            title: 'Proveedor',
            align: 'start',
            key: 'proveedor.nombre',
        },
        {
            title: 'Total',
            align: 'start',
            key: 'total',
        },
        {
            title: 'Acciones',
            align: 'start',
            key: 'acciones',
            headerProps: { style: 'width:15%' }
        }

    ])

    return {
        headers
    }
}