import { httpClient } from "../config/utils";

const getClientes = async (params?: any) => await httpClient.get('/admin/clientes', params)
const postClientes = async (params: any) => await httpClient.post('/admin/clientes/create', params)
const getCliente = async (params: any, id?: number) => {
    const url = id
      ? `/admin/clientes/obtener/${id}`
      : '/admin/clientes/obtener';
  
    return await httpClient.get(url, { params });
  };

export {
    getClientes,
    postClientes,
    getCliente
}