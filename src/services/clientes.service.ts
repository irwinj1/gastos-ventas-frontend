import { httpClient } from "../config/utils";

const getClientes = async (page: number, params?: any) =>
  await httpClient.get('/admin/clientes', {
    params: { page, ...params }
  });
const postClientes = async (params: any) => await httpClient.post('/admin/clientes/create', params)
const getCliente = async (id?: number) => {
    const url = id
      ? `/admin/clientes/obtener/${id}`
      : '/admin/clientes/obtener';
  
    return await httpClient.get(url);
  };
const updateCliente = async (id:number,params?:any) => await httpClient.put(`/admin/clientes/actualizar/${id}`,params)

const elminarCliente = async (id:number)=> await httpClient.delete(`/admin/clientes/eliminar/${id}`)

export {
    getClientes,
    postClientes,
    getCliente,
    updateCliente,
    elminarCliente
}