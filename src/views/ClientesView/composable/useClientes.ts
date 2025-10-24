import { computed, ref } from "vue";
import type { ClientesInterfaces } from "../../../interfaces";
import { useClientesStore } from "../../../store/useClientesStore";

export function useClientes(){
    const clientesStore = useClientesStore()
    const clientes = computed(()=>clientesStore.clientes)
    const pagination = computed(()=>clientesStore.pagination)
    const cliente1 = computed(()=>clientesStore.clienteSeleccionado)
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
            title: 'Nombre',
            align: 'start',
            key: 'nombre',
        },
        {
            title: 'Apellido',
            align: 'start',
            key: 'apellido',
        },
        {
            title: 'Nombre comercial',
            align: 'start',
            key: 'nombreComercial',
        },
        {
            title: 'DUI',
            align: 'start',
            key: 'dui',
        },
        {
            title: 'NIT',
            align: 'start',
            key: 'dui',
        },
        {
            title: 'Número registro',
            align: 'start',
            key: 'nRegistro',
        },
        {
            title: 'Teléfono',
            align: 'start',
            key: 'telefono',
        },
        {
            title: 'Dirección',
            align: 'start',
            key: 'direccion',
        },
        {
            title: 'Acciones',
            align: 'start',
            key: 'acciones',
            headerProps: { style: 'width:15%' }
        }
    ])
    const items = ref<ClientesInterfaces[]>()

    const getClientes = async(page:number,params?:any)=>{
        try {
            await clientesStore.getClientes(page,params)
           
        } catch (error) {
            
        }
    }
    const getClient = async(id:number)=>{
        try {
            await clientesStore.getCliente(id)
        } catch (error) {
            
        }
    }

    const eliminarClientes = async (id:number)=>{
        try {
            await clientesStore.eliminarCliente(id)
        } catch (error) {
            console.error(error);
        }
    }


    return {
        headers,
        items,
        clientes,
        getClientes,
        pagination,
        eliminarClientes,
        getClient,
        cliente1
    }
}