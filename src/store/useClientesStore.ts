import { defineStore } from "pinia";
import { getClientes, postClientes,getCliente } from "../services";
import type { Clientes } from "../interfaces";


export const useClientesStore = defineStore('storeClientes',{
    state:()=>({
        clientes: [] as Clientes[],
        clienteSeleccionado: null as Clientes | null,
        loading: false,
    }),
    actions:{
        async getClientes(params?:any){
            try {
                this.loading = true
                const response = await getClientes(params)
                
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

