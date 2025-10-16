// routes/auth.routes.ts
import { Router, Response } from "express";
import { login, register } from "../controllers/auth.controller";
import { authMiddleware, AuthRequest } from "../Middlewares/logger.JWT";
import { authorizeRoles } from "../Middlewares/roles.middleware";

const router = Router();

// =====================
// RUTAS PÚBLICAS
// =====================
router.post("/login", login);
router.post("/register", register);

// =====================
// RUTAS PROTEGIDAS
// =====================

// Perfil: cualquier usuario autenticado
router.get("/perfil", authMiddleware, (req: AuthRequest, res: Response) => {
return res.json({
    message: "Acceso permitido",
    user: req.user, 
});
});

// Ruta solo para admin
router.get("/admin", authMiddleware, authorizeRoles("admin"), (req: AuthRequest, res: Response) => {
return res.json({ message: "Acceso de admin permitido" });
});

export default router;



