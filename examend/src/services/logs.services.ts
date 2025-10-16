import { Cliente } from "../models/clientes.model";
import { Orden } from "../models/orden.model";
import { Producto } from "../models/productos.models";
import { Bodega } from "../models/bodegas.model";

export class OrdenesService {
  /**
   * @param clienteId ID del cliente
   * @returns Lista de órdenes con productos y bodega asociada
   * @throws Error si el cliente no existe
   */
  static async historialOrdenes(clienteId: number) {
    // Validar que el cliente exista
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) throw new Error("Cliente no encontrado");

    // Traer todas las órdenes del cliente
    const historial = await Orden.findAll({
      where: { clienteId: cliente.id },
      include: [
        {
          model: Producto,
          as: "productos",
          attributes: ["id", "nombre", "precio"],
          through: { attributes: ["cantidad", "precio"] }, // Datos de la tabla intermedia
        },
        {
          model: Bodega,
          as: "bodega",
          attributes: ["id", "nombre", "estado"], // Mejor incluir estado
        },
      ],
      attributes: ["id", "estado", "fecha", "total"],
      order: [["fecha", "DESC"]],
    });

    return historial;
  }
}


