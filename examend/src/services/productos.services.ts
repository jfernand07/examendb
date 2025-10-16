import { Producto } from "../models/productos.models";
import type { ProductoDTO } from "../interfaces/productos.interface";

/** Obtener todos los productos registrados en la base de datos */
export const getAllProductos = async (): Promise<Producto[]> => {
  return await Producto.findAll();
};

/** Obtener un producto por su ID */
export const getProductoById = async (id: number): Promise<Producto | null> => {
  return await Producto.findByPk(id);
};

/** Crear un nuevo producto */
export const createProducto = async (
  data: Omit<ProductoDTO, "id" | "created_at" | "updated_at">
): Promise<Producto> => {
  // Filtramos solo los campos que Sequelize puede insertar
  const productoData = {
    sku: data.sku,
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    peso: data.peso,
  };

  return await Producto.create(productoData);
};

/** Actualizar un producto existente */
export const updateProducto = async (
  id: number,
  data: Partial<Omit<ProductoDTO, "id" | "created_at" | "updated_at">>
): Promise<Producto | null> => {
  const producto = await Producto.findByPk(id);
  if (!producto) return null;

  // Usar set() para tipado seguro
  producto.set({
    sku: data.sku ?? producto.sku,
    nombre: data.nombre ?? producto.nombre,
    descripcion: data.descripcion ?? producto.descripcion,
    precio: data.precio ?? producto.precio,
    peso: data.peso ?? producto.peso,
  });

  await producto.save();
  return producto;
};

/** Eliminar un producto por su ID */
export const deleteProducto = async (id: number): Promise<boolean> => {
  const producto = await Producto.findByPk(id);
  if (!producto) return false;

  await producto.destroy();
  return true;
};



