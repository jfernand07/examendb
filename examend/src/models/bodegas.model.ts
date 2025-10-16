import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config.db/db";
import type { IBodega } from "../interfaces/bodegas.interface";
import { BodegaStatus } from "../types/enum";

type BodegaCreationAttributes = Optional<
  IBodega,
  "id" | "ubicacion" | "contacto" | "tipo_Orden" | "estado" | "created_at" | "updated_at"
>;

export class Bodega extends Model<IBodega, BodegaCreationAttributes> implements IBodega {
  public id!: number;
  public nombre!: string;
  public ubicacion?: string;
  public contacto?: string;
  public tipo_Orden?: string;
  public estado?: BodegaStatus;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Bodega.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    ubicacion: { type: DataTypes.TEXT, allowNull: true },
    contacto: { type: DataTypes.STRING(100), allowNull: true },
    tipo_Orden: { type: DataTypes.STRING(100), allowNull: true },
    estado: {
      type: DataTypes.ENUM(...Object.values(BodegaStatus)),
      allowNull: false,
      defaultValue: BodegaStatus.ACTIVA,
    },
  },
  {
    sequelize,
    tableName: "bodegas",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);




