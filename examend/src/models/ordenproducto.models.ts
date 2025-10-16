// models/ordenproducto.model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config.db/db";
import type { IOrdenProducto } from "../interfaces/ordenproducto.interface";
import { Orden } from "./orden.model";
import { Producto } from "./productos.models";
import { OrderStatus } from "../types/enum";

// Definimos los campos opcionales para creación (se pueden derivar de la interfaz)
type OrdenProductoCreationAttributes = IOrdenProducto;

export class OrdenProducto extends Model<IOrdenProducto, OrdenProductoCreationAttributes> implements IOrdenProducto {
  public ordenId!: number;
  public productoId!: number;
  public cantidad!: number;
  public precio!: number;
  public estado!: OrderStatus;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

OrdenProducto.init(
  {
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Orden, key: "id" },
      primaryKey: true,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Producto, key: "id" },
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.CREATED,
    },
    created_at: {
      
type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ordenproducto",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relaciones many-to-many
Orden.belongsToMany(Producto, { through: OrdenProducto, foreignKey: "ordenId", as: "productos" });
Producto.belongsToMany(Orden, { through: OrdenProducto, foreignKey: "productoId", as: "ordenes" });

export default OrdenProducto;