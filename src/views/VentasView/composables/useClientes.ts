import { useClientesStore } from "../../../store/useClientesStore";
import { computed } from "vue";

export function useClientes(){
    const clientesStore = useClientesStore()
    const clientes = computed(()=>clientesStore.clientes)
    const cliente = computed(()=>clientesStore.clienteSeleccionado)
    const loading = computed(()=>clientesStore.loading)

    const getClientes = async(params:any)=>{
        try {
            clientesStore.getClientes(params)
        } catch (error) {
            console.error(error);
            
        }
    }
    const postCliente = async (params:any)=>{
        try {
           clientesStore.postCliente(params)
        } catch (error) {
            console.error(error);
            
        }
    }

    return {
        getClientes,
        clientes,
        cliente,
        loading,
        postCliente
    }

}