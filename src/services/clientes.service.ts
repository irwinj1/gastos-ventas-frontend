import { httpClient } from "../config/utils";

const getClientes = async (params:any)=> await httpClient.get('/admin/clientes',params)
const postClientes = async (params:any) => await httpClient.post('/admin/clientes/create',params)

export {
    getClientes,
    postClientes
}