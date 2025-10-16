// app.ts
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import sequelize from "./config.db/db"; // NO poner extensión .ts

// Rutas (usar .ts para ts-node-dev)
import authRoutes from "./routes/auth.controller.ts";
import { router as userRoutes } from "./routes/user.routes.ts";
import { router as clienteRoutes } from "./routes/clientes.routes.ts";
import { router as bodegaRoutes } from "./routes/bodegas.routes.ts";
import { router as ordenRoutes } from "./routes/ordenes.routes.ts";
import { router as productosRoutes } from "./routes/productos.routes.ts";

// Seeders
import { seedProductos } from "./seeders/producto.seeders.ts";
import { seedBodegas } from "./seeders/bodega.seeders.ts";
import { seedClientes } from "./seeders/clientes.seeders.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/clientes", clienteRoutes);
app.use("/bodegas", bodegaRoutes);
app.use("/ordenes", ordenRoutes);
app.use("/productos", productosRoutes);

// Ruta raíz
app.get("/", (_req: Request, res: Response) => {
  res.send("API funcionando ✅");
});

// Middleware global de manejo de errores
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error global:", err);
  res.status(500).json({ message: "Error interno del servidor", error: err.message });
});

// Conexión a la base de datos, sincronización y seeders
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a PostgreSQL ✅");

    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada ✅");

    // Seeders
    console.log("Ejecutando seeders...");
    await seedProductos();
    await seedBodegas();
    await seedClientes();
    console.log("Seeders ejecutados ✅");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
})();


















