import { useVentasStore } from "../../../store/useVentasStore";
import { ref, computed } from "vue";

export function useVentas() {
  const ventasStore = useVentasStore();
  const ventas = computed(() => ventasStore.ventas);
  const pagination = computed(() => ventasStore.pagination);
  const venta = computed(()=>ventasStore.venta)

  const cargarVentas = async (page:number,params?:any) => {
    await ventasStore.getVentas(page,params);
  };

  const createVenta = async (params: any) => {
    try {              
        await ventasStore.createVenta(params);
    } catch (error) {}
  };

  const eliminarFactura = async (params:number)=>{
    try {
      
    } catch (error) {
      
    }
  }

  const getVentaID = async (id:number)=>{
    try {
      await ventasStore.getVentaID(id);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    ventas,
    pagination,
    cargarVentas,
    createVenta,
    eliminarFactura,
    getVentaID,
    venta
  };
}
