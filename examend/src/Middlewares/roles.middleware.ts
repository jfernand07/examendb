import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./logger.JWT.ts";

/**
 * Middleware para autorizar roles específicos
 *  @param allowedRoles 
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.rol; 

    if (!userRole) {
      return res.status(401).json({
        message: "No autorizado. Debes iniciar sesión.",
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Acceso denegado. No tienes permisos suficientes.",
      });
    }

    next();
  };
};


