// interfaces/ordenproducto.interface.ts
import { OrderStatus } from "../types/enum";

export interface IOrdenProducto {
ordenId: number;          
productoId: number;       
cantidad: number;         
precio: number;           
estado?: OrderStatus;     
created_at?: Date;        
updated_at?: Date;        
}
