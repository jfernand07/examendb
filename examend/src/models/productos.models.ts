import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config.db/db";
import type { ProductoDTO } from "../interfaces/productos.interface";
import { Bodega } from "./bodegas.model";

// Campos opcionales al crear un producto
type ProductoCreationAttributes = Optional<
  ProductoDTO & { bodegaId?: number }, // bodegaId agregado para relación
  "id" | "descripcion" | "peso" | "created_at" | "updated_at" | "bodegaId"
>;

export class Producto extends Model<ProductoDTO & { bodegaId?: number }, ProductoCreationAttributes> implements ProductoDTO {
  public id!: number;
  public sku!: string;
  public nombre!: string;
  public descripcion?: string;
  public precio!: number;
  public peso?: number;
  public bodegaId?: number; // Relación con Bodega
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Producto.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sku: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    precio: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    peso: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    bodegaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Bodega, key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "productos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relación con Bodega
Bodega.hasMany(Producto, { foreignKey: "bodegaId", as: "productos" });
Producto.belongsTo(Bodega, { foreignKey: "bodegaId", as: "bodega" });

export default Producto;


