// services/bodegas.service.ts
import { Bodega } from "../models/bodegas.model";
import { Producto } from "../models/productos.models";
import type { IBodega } from "../interfaces/bodegas.interface";
import { BodegaStatus } from "../types/enum";

/** Obtener todas las bodegas registradas en la base de datos */
export const getAllBodegas = async (): Promise<Bodega[]> => {
  return await Bodega.findAll();
};

/** Obtener una bodega por su ID */
export const getBodegaById = async (id: number): Promise<Bodega | null> => {
  return await Bodega.findByPk(id);
};

/** Crear una nueva bodega */
export const createBodega = async (
  data: Omit<IBodega, "id" | "created_at" | "updated_at">
): Promise<Bodega> => {
  return await Bodega.create(data);
};

/** Actualizar los datos de una bodega existente */
export const updateBodega = async (
  id: number,
  data: Partial<IBodega>
): Promise<Bodega | null> => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return null;

  await bodega.update(data);
  return bodega;
};

/** Eliminar una bodega por su ID */
export const deleteBodega = async (id: number): Promise<boolean> => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) return false;

  await bodega.destroy();
  return true;
};

/** Activar o inactivar una bodega usando enum */
export const toggleBodega = async (id: number, activar: boolean): Promise<Bodega> => {
  const bodega = await Bodega.findByPk(id);
  if (!bodega) throw new Error("Bodega no encontrada");

  // Usamos set para actualizar correctamente el campo con el enum
  bodega.set("estado", activar ? BodegaStatus.ACTIVA : BodegaStatus.INACTIVA);

  await bodega.save();
  return bodega;
};

/** Obtener todas las bodegas activas con productos asociados */
export const getBodegasActivasConStock = async (): Promise<Bodega[]> => {
  return await Bodega.findAll({
    where: { estado: BodegaStatus.ACTIVA },
    include: [
      {
        model: Producto,
        as: "productos",
        attributes: ["id", "nombre", "precio", "peso", "bodegaId"],
      },
    ],
  });
};

/** Buscar bodegas por tipo de orden */
export const findBodegasByTipoOrden = async (tipo_Orden: string): Promise<Bodega[]> => {
  return await Bodega.findAll({ where: { tipo_Orden } });
};

