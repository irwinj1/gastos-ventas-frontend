import { httpClient } from "../config/utils";

const getProveedores = async (page: number, params?: any) =>
  httpClient("/admin/proveedores", {
    params: { page, ...params },
  });

  export {
    getProveedores
  }