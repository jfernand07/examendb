export interface ICliente {
  id?: number;
  nombre: string;
  email?: string;
  cedula?: number
  telefono?: string;
  direccion?: string;
  historial_ordenes?: string
  created_at?: Date;
  updated_at?: Date;
}


