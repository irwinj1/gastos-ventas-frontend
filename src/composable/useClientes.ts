import { computed } from "vue";
import { getCliente, postClientes,getClientes } from "../services";
import { useClientesStore } from "../store/useClientesStore";
import type { ClientesInterfaces } from "../interfaces";


export function useClientes(){
    const clienteStore = useClientesStore()
    const clientes = computed(()=>clienteStore.clientes)
    const cliente1 = computed(()=>clienteStore.clienteSeleccionado)

    const getClientes = async()=>{
        try {
            const respone = await clienteStore.getClientes()
        } catch (error) {
            console.error(error);
            
        }
    }
    const postCliente = async (params:ClientesInterfaces)=>{
        try {
            const respone = await clienteStore.postCliente(params)
            return respone
        } catch (error) {
            
        }
    }
    return {
        cliente1,clientes,postCliente
    }
}