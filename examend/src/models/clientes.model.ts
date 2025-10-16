import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config.db/db";
import type { ICliente } from "../interfaces/clientes.interface";
import { Orden } from "./orden.model"; // sin extensión .ts

// Campos opcionales al crear un cliente
type ClienteCreationAttributes = Optional<
  ICliente,
  "id" | "email" | "telefono" | "direccion" | "cedula" | "created_at" | "updated_at"
>;

export class Cliente extends Model<ICliente, ClienteCreationAttributes> implements ICliente {
  public id!: number;  
  public nombre!: string;
  public email?: string;
  public cedula?: number;
  public telefono?: string;
  public direccion?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relación con Orden 
  public getOrdenes!: () => Promise<Orden[]>;
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "clientes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relaciones
Cliente.hasMany(Orden, { foreignKey: "clienteId", as: "ordenes" });
Orden.belongsTo(Cliente, { foreignKey: "clienteId", as: "cliente" });

export default Cliente;




