import { Orden } from "../models/orden.model";
import { Cliente } from "../models/clientes.model";
import { Bodega } from "../models/bodegas.model";
import { Producto } from "../models/productos.models";
import { OrdenProducto } from "../models/ordenproducto.models";
import { OrderStatus } from "../types/enum";

interface CrearOrdenDTO {
  clienteId: number;
  productos: { productoId: number; cantidad: number }[];
  bodegaId?: number;
}

export class OrdenService {
  /**
   * Crear una nueva orden con productos y bodega opcional
   */
  static async crearOrden(data: CrearOrdenDTO) {
    const { clienteId, productos, bodegaId } = data;

    // Validar cliente
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) throw new Error("Cliente no encontrado");

    // Validar bodega si se pasa
    if (bodegaId) {
      const bodega = await Bodega.findByPk(bodegaId);
      if (!bodega) throw new Error("Bodega no encontrada");
      if (bodega.estado !== "activa") throw new Error("Bodega inactiva");
    }

    // Validar productos y calcular total
    const productosDetalles = await Promise.all(
      productos.map(async (item) => {
        const producto = await Producto.findByPk(item.productoId);
        if (!producto) throw new Error(`Producto ${item.productoId} no encontrado`);
        return { producto, cantidad: item.cantidad };
      })
    );

    const total = productosDetalles.reduce(
      (acc, p) => acc + Number(p.producto.precio) * p.cantidad,
      0
    );

    // Crear orden
    const orden = await Orden.create({
      clienteId,
      bodegaId: bodegaId || null,
      total,
      estado: OrderStatus.CREATED,
    });

    // Crear relaciones con productos en la tabla intermedia
    await Promise.all(
      productosDetalles.map(async (p) => {
        await OrdenProducto.create({
          ordenId: orden.id,
          productoId: p.producto.id,
          cantidad: p.cantidad,
          precio: Number(p.producto.precio),
          estado: OrderStatus.CREATED,
        });
      })
    );

    return orden;
  }

  /**
   * Actualizar el estado de una orden
   */
  static async actualizarEstado(ordenId: number, estado: OrderStatus) {
    const orden = await Orden.findByPk(ordenId);
    if (!orden) throw new Error("Orden no encontrada");

    orden.estado = estado;
    await orden.save();
    return orden;
  }

  /**
   * Obtener historial de órdenes de un cliente
   */
  static async historialCliente(clienteId: number) {
    // Validar cliente
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) throw new Error("Cliente no encontrado");

    // Traer todas las órdenes del cliente
    const historial = await Orden.findAll({
      where: { clienteId },
      include: [
        {
          model: Producto,
          as: "productos",
          attributes: ["id", "nombre", "precio", "sku"],
          through: { attributes: ["cantidad", "precio", "estado"] },
        },
        {
          model: Bodega,
          as: "bodega",
          attributes: ["id", "nombre", "ubicacion", "estado"],
        },
      ],
      attributes: ["id", "estado", "fecha", "total"],
      order: [["fecha", "DESC"]],
    });

    return historial;
  }
}








