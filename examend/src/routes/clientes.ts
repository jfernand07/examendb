import { Router } from "express";
import {getClientes,getClienteByCedula,createCliente,updateCliente,deleteCliente,} from "../controllers/clientes.controller";
import { authMiddleware } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();


// Rutas públicas

router.get("/clientes", getClientes);
router.get("/clientes/:id", getClienteByCedula);

// Rutas privadas


// Crear cliente (admin o user)
router.post(
"/clientes",authMiddleware,authorizeRoles("admin", "user"),createCliente);

// Actualizar cliente (admin o user)
router.patch("/clientes/:id",authMiddleware,authorizeRoles("admin", "user"),updateCliente);

// Eliminar cliente (admin o user)
router.delete("/clientes/:id",authMiddleware,authorizeRoles("admin", "user"),deleteCliente);

export default router;

