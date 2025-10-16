// controllers/orden.controller.ts
import type { Request, Response } from "express";
import { OrdenService } from "../services/orden.service";
import { OrderStatus } from "../types/enum";
import { HttpErrorStatus } from "../types/types";
import type { IOrden, CrearOrdenDTO } from "../interfaces/orden.interface";

// =====================
// CREAR NUEVA ORDEN
// =====================
export const crearOrden = async (
  req: Request<unknown, unknown, CrearOrdenDTO>,
  res: Response
) => {
  try {
    const { clienteId, productos, bodegaId } = req.body;

    if (!clienteId || !productos || productos.length === 0) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: "clienteId y productos son obligatorios",
      });
    }

    // Llamada al servicio para crear la orden
    const orden: IOrden = await OrdenService.crearOrden({ clienteId, productos, bodegaId });
    res.status(201).json(orden);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al crear la orden",
      error: errorMessage,
    });
  }
};

// =====================
// ACTUALIZAR ESTADO DE ORDEN
// =====================
export interface ActualizarEstadoDTO {
  estado: OrderStatus;
}

export const actualizarEstadoOrden = async (
  req: Request<{ ordenId: string }, unknown, ActualizarEstadoDTO>,
  res: Response
) => {
  try {
    const ordenId = Number(req.params.ordenId);
    const { estado } = req.body;

    if (isNaN(ordenId) || !estado || !Object.values(OrderStatus).includes(estado)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: `ordenId y estado válidos son obligatorios. Estados válidos: ${Object.values(
          OrderStatus
        ).join(", ")}`,
      });
    }

    const ordenActualizada: IOrden | null = await OrdenService.actualizarEstado(ordenId, estado);

    if (!ordenActualizada) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Orden no encontrada" });
    }

    res.json(ordenActualizada);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al actualizar el estado de la orden",
      error: errorMessage,
    });
  }
};

// =====================
// HISTORIAL DE ORDENES DE UN CLIENTE
// =====================
export const historialCliente = async (
  req: Request<{ clienteId: string }>,
  res: Response
) => {
  try {
    const clienteId = Number(req.params.clienteId);
    if (isNaN(clienteId)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: "clienteId inválido",
      });
    }

    const historial: IOrden[] = await OrdenService.historialCliente(clienteId);
    res.json(historial);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al obtener historial de órdenes",
      error: errorMessage,
    });
  }
};





