// controllers/user.controller.ts
import type { Request, Response } from "express";
import { HttpErrorStatus } from "../types/types";
import * as usuarioService from "../services/user.services";
import type { UsuarioDTO } from "../interfaces/user.interface"; // crea interfaz para req.body

/** Obtener todos los usuarios */
export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al obtener los usuarios",
      error: errorMessage,
    });
  }
};

/** Obtener un usuario por ID */
export const getUsuarioById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const usuario = await usuarioService.getUsuarioById(id);
    if (!usuario) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al obtener el usuario",
      error: errorMessage,
    });
  }
};

/** Crear un nuevo usuario */
export const createUsuario = async (
  req: Request<unknown, unknown, UsuarioDTO>,
  res: Response
) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: "Todos los campos son requeridos",
      });
    }

    const nuevoUsuario = await usuarioService.createUsuario({ nombre, email, password, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al crear el usuario",
      error: errorMessage,
    });
  }
};

/** Actualizar un usuario existente */
export const updateUsuario = async (
  req: Request<{ id: string }, unknown, UsuarioDTO>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const usuarioActualizado = await usuarioService.updateUsuario(id, req.body);
    if (!usuarioActualizado) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    res.json(usuarioActualizado);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al actualizar el usuario",
      error: errorMessage,
    });
  }
};

/** Eliminar un usuario */
export const deleteUsuario = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const eliminado = await usuarioService.deleteUsuario(id);
    if (!eliminado) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al eliminar el usuario",
      error: errorMessage,
    });
  }
};
