import { httpClient } from "../config/utils";

const getPaises = async (params?: any) =>
  await httpClient.get("/catalogo/paises", {params});
const getDepartamentos = async (id: number, params?: any) =>
  await httpClient.get(`/catalogo/departamentos/${id}`, {params});
const getmunicipios = async (id: number, params?: any) =>
  await httpClient.get(`/catalogo/municipios/${id}`, {params});
const getDistritos = async (id: number, params?: any) =>
  await httpClient.get(`/catalogo/distritos/${id}`, {params});

const getPdfs = async (params:any)=>httpClient.get('/catalogo/getPdf',{params});

export { getPaises, getDepartamentos, getmunicipios, getDistritos, getPdfs };
