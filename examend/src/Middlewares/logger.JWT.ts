// middleware/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extendemos Request para incluir user
export interface AuthRequest extends Request {
  user?: {
    id: number;
    rol: string;
  };
}

// Middleware para validar JWT
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("Falta la variable de entorno JWT_SECRET");

    // Decodificamos el token
    const decoded = jwt.verify(token, secretKey) as { id: number; rol: string };
    req.user = decoded; // Agregamos user al request

    next(); // Continuamos con la siguiente función
  } catch {
    // No necesitamos la variable 'error' si no la usamos
    return res.status(403).json({ message: "Token inválido" });
  }
};







