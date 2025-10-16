// routes/usuarios.routes.ts
import { Router } from "express";
import {getUsuarios, getUsuarioById, createUsuario,updateUsuario,deleteUsuario,} from "../controllers/user.controller";
import { authMiddleware } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();

// Obtener todos los usuarios (solo admin)
router.get("/users", authMiddleware, authorizeRoles("admin"), getUsuarios);

// Obtener usuario por ID (solo admin)
router.get("/users/:id", authMiddleware, authorizeRoles("admin"), getUsuarioById);

// Crear usuario (solo admin)
router.post("/users", authMiddleware, authorizeRoles("admin"), createUsuario);

// Actualizar usuario (solo admin)
router.patch("/users/:id", authMiddleware, authorizeRoles("admin"), updateUsuario);

// Eliminar usuario (solo admin)
router.delete("/users/:id", authMiddleware, authorizeRoles("admin"), deleteUsuario);

export default router;
