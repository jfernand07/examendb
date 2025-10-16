import sequelize from "../config.db/db"; // sin .ts
import { seedProductos } from "../seeders/producto.seeders";
import { seedBodegas } from "../seeders/bodega.seeders";

(async () => {
  try {
    // Sincroniza las tablas (sin borrar datos existentes)
    await sequelize.sync({ force: false });

    // Ejecuta los seeders
    await seedProductos();
    await seedBodegas();

    console.log("Seed completado ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  }
})();

