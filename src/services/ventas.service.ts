import { httpClient } from "../config/utils";

export const getVentas = async(params:any)=>await httpClient.get('/admin/ventas',params)
export const createVentas = async(params:FormData)=>await httpClient.post('/admin/ventas/create',params, {
    headers: { 'Content-Type': 'multipart/form-data' } // opcional, Axios lo detecta automáticamente
  })