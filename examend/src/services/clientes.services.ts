// services/clientes.service.ts
import { Cliente } from "../models/clientes.model";
import type { ICliente } from "../interfaces/clientes.interface";

/** Obtener todos los clientes registrados en la base de datos */
export const getClientes = async (): Promise<Cliente[]> => {
  return await Cliente.findAll();
};

/** Buscar un cliente por su cédula */
export const getClienteByCedula = async (cedula: number): Promise<Cliente | null> => {
  return await Cliente.findOne({ where: { cedula } });
};

/** Buscar un cliente por su ID */
export const getClienteById = async (id: number): Promise<Cliente | null> => {
  return await Cliente.findByPk(id);
};

/** Crear un nuevo cliente */
export const createCliente = async (
  data: Omit<ICliente, "id" | "created_at" | "updated_at">
): Promise<Cliente> => {
  return await Cliente.create(data);
};

/** Actualizar un cliente existente */
export const updateCliente = async (
  id: number,
  data: Partial<ICliente>
): Promise<Cliente | null> => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;

  cliente.set(data); // usa set para tipado seguro
  await cliente.save();
  return cliente;
};

/** Eliminar un cliente por su ID */
export const deleteCliente = async (id: number): Promise<boolean> => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return false;

  await cliente.destroy();
  return true;
};

