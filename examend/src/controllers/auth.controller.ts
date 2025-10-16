import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Usuario } from "../models/users.model";

dotenv.config();

interface UserWithPassword {
  id: number;
  email: string;
  rol: string;
  nombre: string;
  password: string;
}

interface UserPayload {
  id: number;
  rol: string;
}

// =====================
// REGISTRO DE USUARIO
// =====================
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Debe completar todos los campos" });
    }

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || "user",
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al registrar usuario",
      error: (error as Error).message,
    });
  }
};

// =====================
// LOGIN DE USUARIO
// =====================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Debe proporcionar 'email' y 'password'" });
    }

    const user = (await Usuario.findOne({ where: { email } })) as UserWithPassword | null;
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Credenciales inválidas" });

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("Falta la variable de entorno JWT_SECRET");

    const payload: UserPayload = { id: user.id, rol: user.rol };
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    return res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor al iniciar sesión",
      error: (error as Error).message,
    });
  }
};








