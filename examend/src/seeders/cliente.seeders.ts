import { Cliente } from "../models/clientes.model";

export const seedClientes = async () => {
  try {
    const clientesData = [
      {
        nombre: "Juan Pérez",
        cedula: 123456789,
        email: "juan@example.com",
        telefono: "3001234567",
        direccion: "Calle 1 # 2-3",
      },
      {
        nombre: "María Gómez",
        cedula: 987654321,
        email: "maria@example.com",
        telefono: "3007654321",
        direccion: "Calle 4 # 5-6",
      },
    ];

    for (const cliente of clientesData) {
      await Cliente.findOrCreate({
        where: { cedula: cliente.cedula }, 
        defaults: cliente,
      });
    }

    console.log("Seed de clientes completado ");
  } catch (error) {
    console.error("Error al crear seed de clientes:", error);
    throw error;
  }
};

