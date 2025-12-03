export interface PaisesInterfaces {
    id?:number | null;
    nombre?: string | null;
    siglas?: string | null;
    codigoArea?: string | null;
    mask?: string | null
}

export interface DepartamentosInterfaces {
    id?:number | null;
    nombre?: string | null;
}

export interface MunicipiosInterfaces {
    id?:number | null;
    nombre?: string | null;
}

export interface DistritosInterfaces {
    id?:number | null;
    nombre?: string | null;
}

export interface Pagination {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

export interface ArchivosInterfaces{
    id?:number,
    nombreArchivo?:string,
    ruta?:string,
    extension?:string,
    tamanio?:number,
    img?:string,
   
}