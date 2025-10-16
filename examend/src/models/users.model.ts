import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config.db/db";
import type { UsuarioDTO } from "../interfaces/user.interface";

// Campos opcionales al crear un usuario
type UserCreationAttributes = Optional<UsuarioDTO, "id" | "rol" | "created_at" | "updated_at">;

export class Usuario extends Model<UsuarioDTO, UserCreationAttributes> implements UsuarioDTO {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public rol!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("usuario", "admin"),
      allowNull: false,
      defaultValue: "usuario",
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Usuario;






