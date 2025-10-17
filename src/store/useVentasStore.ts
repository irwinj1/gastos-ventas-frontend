import { defineStore } from "pinia";
import { getVentas,createVentas, deleteVentas } from "../services";

interface Cliente{
    id?:number,
    nombre?:string,
    telefono?:number,
    direccion?:string,
    dui?:string|null,
    nit?:string|null,
    createdAt?:Date;
}

interface DetalleVenta{
    id?:number,
    id_venta?:number,
    descripcion?:string,
    cantidad?:number,
    precioUnitario?:number,
    ventasAfectadas?:number,
    createdAt?:Date
}

interface Venta {
    id?: number;
    cliente?:Cliente,
    detalleVentas?:DetalleVenta[]
    total?:number
  }
  
  interface Pagination {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  }
  
  interface VentasState {
    ventas: Venta[]|null;
    venta: Venta | null;
    pagination: Pagination | null;
  }
  
export const useVentasStore = defineStore('storeVentas',{
    state: ():VentasState=>({
        ventas:[],
        venta:null,
        pagination:null
    }),
    actions:{
       async getVentas(){
            try {

                const response = await getVentas({page:1})
               
                
                this.ventas = response.data.data
                this.pagination = {
                    current_page:response.data?.pagination.current_page,
                    last_page:response.data?.pagination.last_page,
                    per_page:response.data?.pagination.per_page,
                    total:response.data?.pagination.total
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
              
                // Adjuntar imágenes
                params.detalleVentas.forEach((item:any, index:any) => {
                  
                    if (item.image instanceof File) {
                      formData.append(`imagenes[${index}]`, item.image); // esto está correcto
                    }
                  });
              
                // Enviar al backend
                const response = await createVentas(formData); 
              
              
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