// seeders/bodegas.seeder.ts
import { Bodega } from "../models/bodegas.model";
import { BodegaStatus } from "../types/enum"; // Si tienes un enum separado para estado de bodega

export const seedBodegas = async () => {
  try {
    const bodegasData = [
      {
        nombre: "Bodega Central",
        ubicacion: "Calle 123, Bogotá",
        contacto: "3101234567",
        tipo_Orden: "entrega",
        estado: BodegaStatus.ACTIVA, 
      },
      {
        nombre: "Bodega Norte",
        ubicacion: "Carrera 45, Medellín",
        contacto: "3109876543",
        tipo_Orden: "devolucion",
        estado: BodegaStatus.ACTIVA,
      },
      {
        nombre: "Bodega Sur",
        ubicacion: "Av. 5, Cali",
        contacto: "3112345678",
        tipo_Orden: "entrega",
        estado: BodegaStatus.INACTIVA,
      },
    ];

    for (const bodega of bodegasData) {
      await Bodega.findOrCreate({
        where: { nombre: bodega.nombre },
        defaults: bodega,
      });
    }

    console.log("Seed de bodegas completado ✅");
  } catch (error) {
    console.error("Error al crear seed de bodegas:", error);
    throw error;
  }
};

