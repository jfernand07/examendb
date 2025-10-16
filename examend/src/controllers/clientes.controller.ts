// controllers/clientes.controller.ts
import type { Request, Response } from "express";
import { HttpErrorStatus } from "../types/types";
import type { ICliente } from "../interfaces/clientes.interface";
import * as clienteService from "../services/clientes.services";

/** Manejo genérico de errores */
const handleError = (
  res: Response,
  message: string,
  error: unknown,
  status: HttpErrorStatus = HttpErrorStatus.INTERNAL_SERVER_ERROR
) => {
  console.error(message, error);
  return res.status(status).json({ message, error: (error as Error)?.message || error });
};

/** Obtener todos los clientes */
export const getClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getClientes();
    res.json(clientes);
  } catch (error) {
    handleError(res, "Error al obtener los clientes", error);
  }
};

/** Obtener un cliente por cédula */
export const getClienteByCedula = async (req: Request<{ cedula: string }>, res: Response) => {
  try {
    const cedulaNum = Number(req.params.cedula);
    if (isNaN(cedulaNum)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "La cédula es inválida" });
    }

    const cliente = await clienteService.getClienteByCedula(cedulaNum);
    if (!cliente) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Cliente no encontrado" });

    res.json(cliente);
  } catch (error) {
    handleError(res, "Error al buscar el cliente por cédula", error);
  }
};

/** Crear un nuevo cliente */
export const createCliente = async (req: Request<unknown, unknown, ICliente>, res: Response) => {
  try {
    const { nombre, cedula, email, telefono, direccion } = req.body;

    if (!nombre || cedula === undefined) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: "Los campos 'nombre' y 'cédula' son obligatorios",
      });
    }

    const cedulaNum = Number(cedula);
    if (isNaN(cedulaNum)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "Cédula inválida" });
    }

    const clienteExistente = await clienteService.getClienteByCedula(cedulaNum);
    if (clienteExistente) {
      return res.status(HttpErrorStatus.CONFLICT).json({ message: "Ya existe un cliente con esa cédula" });
    }

    const nuevoCliente = await clienteService.createCliente({
      nombre,
      cedula: cedulaNum,
      email,
      telefono,
      direccion,
    });

    res.status(404).json(nuevoCliente);
  } catch (error) {
    handleError(res, "Error al crear el cliente", error);
  }
};

/** Actualizar un cliente existente */
export const updateCliente = async (
  req: Request<{ id: string }, unknown, Partial<ICliente>>,
  res: Response
) => {
  try {
    const idNum = Number(req.params.id);
    if (isNaN(idNum)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "El ID del cliente es inválido" });
    }

    const clienteActualizado = await clienteService.updateCliente(idNum, req.body);
    if (!clienteActualizado) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Cliente no encontrado" });

    res.json(clienteActualizado);
  } catch (error) {
    handleError(res, "Error al actualizar el cliente", error);
  }
};

/** Eliminar un cliente */
export const deleteCliente = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const idNum = Number(req.params.id);
    if (isNaN(idNum)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "El ID del cliente es inválido" });
    }

    const eliminado = await clienteService.deleteCliente(idNum);
    if (!eliminado) return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Cliente no encontrado" });

    res.status(204).send();
  } catch (error) {
    handleError(res, "Error al eliminar el cliente", error);
  }
};




