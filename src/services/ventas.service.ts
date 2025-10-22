import { httpClient } from "../config/utils";

export const getVentas = async(page:any,params?:any)=>await httpClient.get(`/admin/ventas?page=${page}`,params)
export const createVentas = async(params:FormData)=>await httpClient.post('/admin/ventas/create',params, {
    headers: { 'Content-Type': 'multipart/form-data' } // opcional, Axios lo detecta automáticamente
  })
export const deleteVentas = async (id:number)=>await httpClient(`/admin/ventas/delete/${id}`)