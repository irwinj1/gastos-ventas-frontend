import { useVentasStore } from "../../../store/useVentasStore";
import { ref, computed } from "vue";

export function useVentas() {
  const ventasStore = useVentasStore();
  const ventas = computed(() => ventasStore.ventas);
  const pagination = computed(() => ventasStore.pagination);

  const cargarVentas = async () => {
    await ventasStore.getVentas();
  };

  const createVenta = async (params: any) => {
    try {              
        await ventasStore.createVenta(params);
    } catch (error) {}
  };

  return {
    ventas,
    pagination,
    cargarVentas,
    createVenta,
  };
}
