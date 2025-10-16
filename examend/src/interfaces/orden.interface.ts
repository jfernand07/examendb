// interfaces/orden.interface.ts
import { OrderStatus } from "../types/enum";

export interface IOrden {
  id: number;
  clienteId: number;
  bodegaId?: number | null;
  estado: OrderStatus; // Usamos el ENUM directamente
  fecha: Date;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductoOrdenDTO {
  productoId: number; // referencia al producto existente
  cantidad: number;
}

export interface CrearOrdenDTO {
  clienteId: number;
  bodegaId?: number;
  productos: ProductoOrdenDTO[];
}
