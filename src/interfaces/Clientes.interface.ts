import type { DepartamentosInterfaces, DistritosInterfaces, MunicipiosInterfaces, PaisesInterfaces } from "./Catalogos.interfaces";

export interface ClientesInterfaces {
    id?: number | null;
    nombre?: string | null;
    apellido?: string | null;
    nombreComercial?: string | null;
    email?: string | null;
    dui?: string | null;
    nit?: string | null;
    registro?:string | null;
    telefono?: string | null;
    direccion?: string | null;
    esCliente?: boolean;
    esProveedor?: boolean;
    distrito?: DistritosInterfaces | null,
    municipio?: MunicipiosInterfaces | null,
    departamento?: DepartamentosInterfaces | null,
    pais?: PaisesInterfaces | null
  }