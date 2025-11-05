import { computed } from "vue";
import { useCatalagosStore } from "../store/useCatalagosStore";

export function useCatalogos() {
  const catalagoStore = useCatalagosStore();
  const paises = computed(() => catalagoStore.paises);
  const departamentos = computed(() => catalagoStore.departamentos);
  const municipios = computed(() => catalagoStore.municipios);
  const distritos = computed(() => catalagoStore.distritos);

  const paisesGet = async(params?:any)=>{
    try {
       
        await catalagoStore.getPaises(params)
    } catch (error) {
        
    }
  }
  const derpatamentosGet = async (idPais:number,params?:any)=>{
        await catalagoStore.getDepartamentos(idPais,params)
  }

  const municipiosGet = async (idDepartamento:number,params?:any)=>{
    await catalagoStore.getmunicipios(idDepartamento,params)
  }

  const distritosGet = async (idMunicipio:number,params?:any)=>{
    await catalagoStore.getDistritos(idMunicipio,params)
  }


  return {
    paises,
    departamentos,
    municipios,
    distritos,
    paisesGet,
    derpatamentosGet,
    municipiosGet,
    distritosGet
  };
}
