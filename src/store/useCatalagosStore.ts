import { defineStore } from "pinia";
import {
  getPaises,
  getDepartamentos,
  getmunicipios,
  getDistritos,
} from "../services";
import type {
  PaisesInterfaces,
  DepartamentosInterfaces,
  MunicipiosInterfaces,
  DistritosInterfaces,
} from "../interfaces";
import { useAlert } from "../composable/useAlert";

interface CatalogosState {
  paises: PaisesInterfaces[] | null;
  departamentos: DepartamentosInterfaces[] | null;
  municipios: MunicipiosInterfaces[] | null;
  distritos: DistritosInterfaces[] | null;
}
const alert = useAlert();

export const useCatalagosStore = defineStore("catalgosStore", {
  state: (): CatalogosState => ({
    paises: [],
    departamentos: [],
    municipios: [],
    distritos: [],
  }),
  actions: {
    async getPaises(params?: any) {
      try {
        const response = await getPaises(params);
        
        if (response?.data?.status == 200) {
          this.paises = response.data.data;
        }
      } catch (error) {
        alert.show("Error al obtener los paises", "error", 3000);
      }
    },
    async getDepartamentos(id: number, params?: any) {
      try {
        const response = await getDepartamentos(id, params);
        if (response?.data?.status == 200) {
          this.departamentos = response.data.data;
        }
      } catch (error) {
        alert.show("Error al obtener los departamentos", "error", 3000);
      }
    },
    async getmunicipios(id: number, params?: any) {
      try {
        const response = await getmunicipios(id, params);
        if (response?.data?.status == 200) {
          this.municipios = response.data.data;
        }
      } catch (error) {
        alert.show("Error al obtener los municipios", "error", 3000);
      }
    },
    async getDistritos(id: number, params?: any) {
      try {
        const response = await getDistritos(id, params);
        if (response?.data?.status == 200) {
          this.distritos = response.data.data;
        }
      } catch (error) {
        alert.show("Error al obtener los distritos", "error", 3000);
      }
    },
  },
});
