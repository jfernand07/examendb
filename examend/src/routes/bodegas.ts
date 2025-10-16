import { Router } from "express";
import {
  getClientes,
  getClienteByCedula,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clientes.controller";
import { authMiddleware } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();

// Rutas públicas
router.get("/clientes", getClientes);
router.get("/clientes/cedula/:cedula", getClienteByCedula);


// Rutas privadas 
router.post(
  "/clientes",
  authMiddleware,
  authorizeRoles("admin", "user"),
  createCliente
);

// Actualizar cliente (admin o user)
router.patch(
  "/clientes/:id",
  authMiddleware,
  authorizeRoles("admin", "user"),
  updateCliente
);

// Eliminar cliente (solo admin)
router.delete(
  "/clientes/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteCliente
);

export default router;


