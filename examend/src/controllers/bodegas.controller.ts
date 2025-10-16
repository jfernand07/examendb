import type { Request, Response } from "express";
import { HttpErrorStatus } from "../types/types";
import type { IBodega } from "../interfaces/bodegas.interface";
import * as bodegaService from "../services/bodegas.services";

/** Manejo genérico de errores */
const handleError = (res: Response, message: string, error: unknown, status = HttpErrorStatus.INTERNAL_SERVER_ERROR) => {
  console.error(message, error);
  return res.status(status).json({ message, error: (error as Error)?.message || error });
};

/** Obtener todas las bodegas */
export const getBodegas = async (_req: Request, res: Response) => {
  try {
    const bodegas = await bodegaService.getAllBodegas();
    res.json(bodegas);
  } catch (error) {
    handleError(res, "Error al obtener las bodegas", error);
  }
};

/** Obtener una bodega por su ID */
export const getBodegaById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });

    const bodega = await bodegaService.getBodegaById(id);
    if (!bodega) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Bodega no encontrada" });

    res.json(bodega);
  } catch (error) {
    handleError(res, "Error al obtener la bodega", error);
  }
};

/** Crear una nueva bodega */
export const createBodega = async (req: Request<unknown, unknown, IBodega>, res: Response) => {
  try {
    const { nombre, ubicacion, contacto, tipo_Orden, estado } = req.body;
    if (!nombre) return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "El nombre es obligatorio" });

    const nuevaBodega = await bodegaService.createBodega({ nombre, ubicacion, contacto, tipo_Orden, estado });
    res.status(201).json(nuevaBodega);
  } catch (error) {
    handleError(res, "Error al crear la bodega", error);
  }
};

/** Actualizar una bodega existente */
export const updateBodega = async (req: Request<{ id: string }, unknown, Partial<IBodega>>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });

    const bodegaActualizada = await bodegaService.updateBodega(id, req.body);
    if (!bodegaActualizada) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Bodega no encontrada" });

    res.json(bodegaActualizada);
  } catch (error) {
    handleError(res, "Error al actualizar la bodega", error);
  }
};

/** Eliminar una bodega */
export const deleteBodega = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });

    const eliminada = await bodegaService.deleteBodega(id);
    if (!eliminada) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Bodega no encontrada" });

    res.status(204).send();
  } catch (error) {
    handleError(res, "Error al eliminar la bodega", error);
  }
};

/** Activar o inactivar una bodega */
export const toggleBodega = async (req: Request<{ id: string }, unknown, { activar: boolean }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { activar } = req.body;

    if (isNaN(id) || typeof activar !== "boolean") {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "Parámetros inválidos" });
    }

    const bodega = await bodegaService.toggleBodega(id, activar);
    res.json({ message: `Bodega ${activar ? "activada" : "inactivada"}`, bodega });
  } catch (error) {
    handleError(res, "Error al cambiar el estado de la bodega", error);
  }
};

/** Obtener todas las bodegas activas con stock */
export const getBodegasActivasConStock = async (_req: Request, res: Response) => {
  try {
    const bodegas = await bodegaService.getBodegasActivasConStock();
    res.json(bodegas);
  } catch (error) {
    handleError(res, "Error al obtener las bodegas activas", error);
  }
};

/** Buscar bodegas por tipo de orden */
export const getBodegasByTipoOrden = async (req: Request<{ tipo_Orden: string }>, res: Response) => {
  try {
    const { tipo_Orden } = req.params;
    if (!tipo_Orden) return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "Tipo de orden requerido" });

    const bodegas = await bodegaService.findBodegasByTipoOrden(tipo_Orden);
    if (!bodegas.length) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "No se encontraron bodegas" });

    res.json(bodegas);
  } catch (error) {
    handleError(res, "Error al buscar las bodegas por tipo de orden", error);
  }
};






