// Cliente.interface.ts
export interface Clientes {
    nombre?: string | null;
    apellido?: string | null;
    nombreComercial?: string | null;
    email?: string | null;
    dui?: string | null;
    nit?: string | null;
    telefono?: string | null;
    direccion?: string | null;
    esCliente?: boolean;
    esProveedor?: boolean;
  }