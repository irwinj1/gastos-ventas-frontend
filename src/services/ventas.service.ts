import { httpClient } from "../config/utils";

export const getVentas = async(params:any)=>await httpClient.get('/admin/ventas',params)