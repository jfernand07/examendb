// routes/productos.routes.ts
import { Router } from "express";
import {getProductos,getProductoById,createProducto,updateProducto,deleteProducto,} from "../controllers/productos.controller";
import { authMiddleware } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();

// Obtener todos los productos (público)
router.get("/productos", getProductos);

// Obtener producto por ID (público)
router.get("/productos/:id", getProductoById);

// Crear producto (solo admin)
router.post("/productos", authMiddleware, authorizeRoles("admin"), createProducto);

// Actualizar producto (solo admin)
router.put("/productos/:id", authMiddleware, authorizeRoles("admin"), updateProducto);

// Eliminar producto (solo admin)
router.delete("/productos/:id", authMiddleware, authorizeRoles("admin"), deleteProducto);

export default router;
