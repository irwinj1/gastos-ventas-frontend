import { defineStore } from "pinia";
import { getVentas,createVentas, deleteVentas, getVenta } from "../services";
import type { VentaInterfaces,Pagination } from "../interfaces";


  interface VentasState {
    ventas: VentaInterfaces[]|null;
    venta: VentaInterfaces | null;
    pagination: Pagination | null;
  }
  
export const useVentasStore = defineStore('storeVentas',{
    state: ():VentasState=>({
        ventas:[],
        venta:null,
        pagination:null
    }),
    actions:{
      async getVentas(page:number,params?:any){
            try {
                const response = await getVentas(page,params)
               
                
                this.ventas = response.data.data
                this.pagination = {
                    current_page:response.data?.pagination?.current_page,
                    last_page:response.data?.pagination?.last_page,
                    per_page:response.data?.pagination?.per_page,
                    total:response.data?.pagination?.total
                }
            } catch (error) {
                console.error(error);
                
            }
      },
      async createVenta(params: any) {
            try {

                const formData = new FormData();
              
                // Convertimos detalleVentas a JSON
                formData.append("detalleVentas", JSON.stringify(params.detalleVentas));
              
                // Cliente
                if (params.clienteId) {
                  formData.append("clienteId", params.clienteId);
                }
                //fecha de facturacion
                if (params.fechaFactura) {
                  const date = new Date(params.fechaFactura);
                  if (!isNaN(date.getTime())) {
                    formData.append(
                      "fechaFactura",
                      date.toISOString().slice(0, 19).replace('T', ' ')
                    );
                  } else {
                    console.error("Fecha inválida:", params.fechaFactura);
                  }
                }
                
                // Adjuntar imágenes
               // params.detalleVentas.forEach((item:any, index:any) => {
                  
                    if (params?.image instanceof File) {
                      formData.append(`imagenes`, params.image); // esto está correcto
                    }
                 // });
              
                // Enviar al backend
                const response = await createVentas(formData); 
              
              
              } catch (error) {
                console.error(error);
              }
      },
      async getVentaID(id:number){
        try {
          const response = await getVenta(id);
         
          this.venta = response?.data?.data;
        
          
        } catch (error) {
          console.error(error);
        }
      },
      async eliminarFactura(id:number){
            try {
                const response = await deleteVentas(id);
                return response.data
            } catch (error) {
                console.error(error);
                
            }
      }
    }
})