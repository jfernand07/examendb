export interface UsuarioDTO {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol?: string;
  created_at?: Date;
  updated_at?: Date;
}

