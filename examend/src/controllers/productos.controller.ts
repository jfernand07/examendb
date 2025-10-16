// controllers/productos.controller.ts
import type { Request, Response } from "express";
import { HttpErrorStatus } from "../types/types";
import * as productoService from "../services/productos.services";
import type { ProductoDTO } from "../interfaces/productos.interface";

/** Obtener todos los productos */
export const getProductos = async (_req: Request, res: Response) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al obtener los productos",
      error: errorMessage,
    });
  }
};

/** Obtener un producto por ID */
export const getProductoById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const producto = await productoService.getProductoById(id);
    if (!producto) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al obtener el producto",
      error: errorMessage,
    });
  }
};

/** Crear un nuevo producto */
export const createProducto = async (
  req: Request<unknown, unknown, ProductoDTO>,
  res: Response
) => {
  try {
    const { sku, nombre, descripcion, precio, peso } = req.body;

    if (!sku || !nombre || !precio) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({
        message: "Los campos sku, nombre y precio son obligatorios",
      });
    }

    const nuevoProducto = await productoService.createProducto({
      sku,
      nombre,
      descripcion,
      precio,
      peso,
    });

    res.status(201).json(nuevoProducto);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al crear el producto",
      error: errorMessage,
    });
  }
};

/** Actualizar un producto existente */
export const updateProducto = async (
  req: Request<{ id: string }, unknown, ProductoDTO>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const productoActualizado = await productoService.updateProducto(id, req.body);
    if (!productoActualizado) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al actualizar el producto",
      error: errorMessage,
    });
  }
};

/** Eliminar un producto */
export const deleteProducto = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(HttpErrorStatus.BAD_REQUEST).json({ message: "ID inválido" });
    }

    const eliminado = await productoService.deleteProducto(id);
    if (!eliminado) {
      return res.status(HttpErrorStatus.NOT_FOUND).json({ message: "Producto no encontrado" });
    }

    res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : error;
    res.status(HttpErrorStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error al eliminar el producto",
      error: errorMessage,
    });
  }
};

