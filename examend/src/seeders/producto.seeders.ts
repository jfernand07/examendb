import { Producto } from "../models/productos.models";

export const seedProductos = async () => {
  try {
    const productosData = [
      {
        sku: "PROD001",
        nombre: "Camiseta Algodón",
        descripcion: "Camiseta 100% algodón, talla M",
        precio: 35000.0,
        peso: 0.2,
      },
      {
        sku: "PROD002",
        nombre: "Pantalón Jeans",
        descripcion: "Pantalón de mezclilla azul, talla 32",
        precio: 80000.0,
        peso: 0.5,
      },
      {
        sku: "PROD003",
        nombre: "Zapatillas Deportivas",
        descripcion: "Zapatillas running, talla 42",
        precio: 150000.0,
        peso: 0.8,
      },
    ];

    for (const prod of productosData) {
      await Producto.findOrCreate({
        where: { sku: prod.sku }, // evita duplicados
        defaults: prod,
      });
    }

    console.log("Seed de productos completado ✅");
  } catch (error) {
    console.error("Error al crear seed de productos:", error);
    throw error;
  }
};

