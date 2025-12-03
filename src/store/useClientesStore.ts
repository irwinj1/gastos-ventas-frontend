import { defineStore } from "pinia";
import { getClientes, postClientes,getCliente, elminarCliente, updateCliente } from "../services";
import type { ClientesInterfaces } from "../interfaces";
import { useAlert } from "../composable/useAlert";

const alert = useAlert();
export const useClientesStore = defineStore('storeClientes',{
    state:()=>({
        clientes: [] as ClientesInterfaces[],
        clienteSeleccionado: null as ClientesInterfaces | null,
        loading: false,
        pagination: {
            current_page:0,
            last_page:0,
            per_page:0,
            total:0
        }
    }),
    actions:{
        async getClientes(page:number,params?:any){
            try {
                this.loading = true
                
                const response = await getClientes(page,params)
                
                this.pagination = {
                    current_page:response.data?.pagination?.currentPage,
                    last_page:response.data?.pagination?.lastPage,
                    per_page:response.data?.pagination?.perPage,
                    total:response.data?.pagination?.total
                }
                this.clientes = response?.data?.data
               
            } catch (error) {
                alert.show('Error al obtener clientes','Error')
            }finally{
            //    setTimeout(()=>{
            //     alert.close()
            //    },3000)
                this.loading = false
            }
        },
        async postCliente(params:any){
            try {
                this.loading = true;
                const response = await postClientes(params)              
                this.clienteSeleccionado = response.data.data
                alert.show('Se creo correctamente el cliente','success')
               return response
               
            } catch (error) {
                console.log(error);
                
                alert.show('Error al crear el cliente','error')
            }
            finally{
                this.loading = false;
            }
        },
        async getCliente(id?:number){
            try {
                this.loading = true
               
                const response = await getCliente(id)
                if (response.data.status == 200) {
                    alert.show('Cliente obtenido correctamente','success')
                    this.clienteSeleccionado = response.data.data
                }
                                
            } catch (error) {
                alert.show('Error al obtener el cliente','error')
            }
            finally{
                this.loading = false
            }
        },

        async updatedCliente (id:number, params:ClientesInterfaces){
            try {                
                const response = await updateCliente(id,params);
                
                if (response?.data?.status == 200) {
                    return true;   
                }
            } catch (error) {
                console.log(error);
                
                alert.show('Error al actualizar el cliente '+ error,'error')
            }
        },

        async eliminarCliente(id:number){
            try {
                const response = await elminarCliente(id)
                if (response.data.status == 200) {
                    alert.show('Cliente se elimino correctamente','success')
                }
            } catch (error) {
                alert.show('Error al eliminar el cliente','error')
            }
        }
    }
});

