import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config.db/db";
import type { IOrden } from "../interfaces/orden.interface";
import { Cliente } from "./clientes.model";
import { Bodega } from "./bodegas.model";
import { OrderStatus } from "../types/enum";
import { Producto } from "./productos.models";
import { OrdenProducto } from "./ordenproducto.models";

// Campos opcionales al crear una orden
type OrdenCreationAttributes = Optional<
  IOrden,
  "id" | "estado" | "fecha" | "total" | "created_at" | "updated_at"
>;

export class Orden extends Model<IOrden, OrdenCreationAttributes> implements IOrden {
  public id!: number;
  public clienteId!: number;
  public bodegaId?: number;
  public estado!: OrderStatus;
  public fecha!: Date;
  public total!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Relaciones
  public getCliente!: () => Promise<Cliente>;
  public getBodega!: () => Promise<Bodega>;
  public getProductos!: () => Promise<Producto[]>;
}

Orden.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Cliente, key: "id" },
      onDelete: "CASCADE",
    },
    bodegaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Bodega, key: "id" },
      onDelete: "SET NULL",
      defaultValue: null,
    },
    estado: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.CREATED,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "ordenes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relaciones con Cliente y Bodega
Cliente.hasMany(Orden, { foreignKey: "clienteId", as: "ordenes" });
Orden.belongsTo(Cliente, { foreignKey: "clienteId", as: "cliente" });

Bodega.hasMany(Orden, { foreignKey: "bodegaId", as: "ordenes" });
Orden.belongsTo(Bodega, { foreignKey: "bodegaId", as: "bodega" });

// Relación muchos a muchos con productos
Orden.belongsToMany(Producto, { through: OrdenProducto, foreignKey: "ordenId", as: "productos" });
Producto.belongsToMany(Orden, { through: OrdenProducto, foreignKey: "productoId", as: "ordenes" });

export default Orden;




