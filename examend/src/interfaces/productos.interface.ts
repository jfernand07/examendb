export interface ProductoDTO {
  id?: number;               
  sku: string;               
  nombre: string;            
  descripcion?: string;      
  precio: number;           
  peso?: number;            
  created_at?: Date;         
  updated_at?: Date;         
}

