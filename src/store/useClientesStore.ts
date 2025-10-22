import { defineStore } from "pinia";
import { getClientes, postClientes,getCliente } from "../services";
import type { ClientesInterfaces } from "../interfaces";


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
                
            }finally{
                this.loading = false
            }
        },
        async postCliente(params:any){
            try {
                this.loading = true;
                const response = await postClientes(params)
        
               
                
                this.clienteSeleccionado = response.data.data
                
               return response
            } catch (error) {
                console.error(error);
                
                
            }
            finally{
                this.loading = false;
            }
        },
        async getCliente(params:any={},id?:number){
            try {
                this.loading = true
               
                const response = await getCliente(params,id)
                if (response.data.status == 200) {
                    this.clienteSeleccionado = response.data.data
                }
                                
            } catch (error) {
                console.error(error);
            }
            finally{
                this.loading = false
            }
        }
    }
});

