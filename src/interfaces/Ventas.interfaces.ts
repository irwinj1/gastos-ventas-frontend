import type { ArchivosInterfaces } from "./Catalogos.interfaces";
import type { ClientesInterfaces } from "./Clientes.interface";

export interface DetalleVenta{
    id?:number,
    id_venta?:number,
    descripcion?:string,
    cantidad?:number,
    precioUnitario?:number,
    ventasAfectadas?:number,
    createdAt?:Date
}

export interface VentaInterfaces {
    id?: number;
    cliente?:ClientesInterfaces,
    detalleVentas?:DetalleVenta[]
    total?:number
    archivos?:ArchivosInterfaces[]
    fechaFactura?:Date
  }
  