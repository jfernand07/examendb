// routes/orden.routes.ts
import { Router } from "express";
import {
  crearOrden,
  actualizarEstadoOrden,
  historialCliente,
} from "../controllers/ordenes.controller";
import { authMiddleware } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();

// Crear orden (solo usuarios autenticados)
router.post("/", authMiddleware, authorizeRoles("admin", "user"), crearOrden);

// Actualizar estado de orden (solo admin)
router.patch("/:ordenId/estado", authMiddleware, authorizeRoles("admin"), actualizarEstadoOrden);

// Historial de órdenes por cliente (admin o user)
router.get("/cliente/:clienteId", authMiddleware, authorizeRoles("admin", "user"), historialCliente);

export default router;

