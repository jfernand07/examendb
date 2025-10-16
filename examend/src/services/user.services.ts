// services/usuarios.services.ts
import { Usuario } from "../models/users.model";
import type { UsuarioDTO } from "../interfaces/user.interface";

/** Obtener todos los usuarios */
export const getUsuarios = async (): Promise<Usuario[]> => {
  return await Usuario.findAll();
};

/** Obtener un usuario por su ID */
export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
  return await Usuario.findByPk(id);
};

/** Crear un nuevo usuario */
export const createUsuario = async (
  data: Omit<UsuarioDTO, "id" | "created_at" | "updated_at">
): Promise<Usuario> => {
  // Aplicar valor por defecto para rol si no viene
  const usuarioData = {
    nombre: data.nombre,
    email: data.email,
    password: data.password,
    rol: data.rol || "usuario",
  };

  const nuevoUsuario = await Usuario.create(usuarioData);
  return nuevoUsuario;
};

/** Actualizar un usuario existente */
export const updateUsuario = async (
  id: number,
  data: Partial<UsuarioDTO>
): Promise<Usuario | null> => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  usuario.set(data); // set garantiza que solo se actualicen campos válidos
  await usuario.save();
  return usuario;
};

/** Eliminar un usuario por su ID */
export const deleteUsuario = async (id: number): Promise<boolean> => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return false;

  await usuario.destroy();
  return true;
};


