import { computed } from "vue";

import { useClientesStore } from "../store/useClientesStore";
import type { ClientesInterfaces } from "../interfaces";


export function useClientes(){
    const clienteStore = useClientesStore()
    const clientes = computed(()=>clienteStore.clientes)
    const cliente1 = computed(()=>clienteStore.clienteSeleccionado)

    const getClientes = async(page:number,params:any)=>{
        try {
            await clienteStore.getClientes(page,params)
        } catch (error) {
            console.error(error);
            
        }
    }
    const getCliente = async(id:number)=>{
        try {
            await clienteStore.getCliente(id)
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

    const updateCliente = async (id:number, params:ClientesInterfaces)=>{
        try {
            const response = await clienteStore.updatedCliente(id,params)
            console.log(response);
            
            if (response) {
                return true
            }
        } catch (error) {
            
        }
    }

    return {
        cliente1,clientes,postCliente, updateCliente,getClientes,getCliente
    }
}