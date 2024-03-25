import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { Mission } from './Mission';

type OmitTypes = 'missions';

class Ship extends Model<
  InferAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >
> {

  declare id: CreationOptional<string>;
  declare name?: string | null;
  declare image?: string | null;
  declare model?: string | null;
  declare type?: string | null;
  declare status?: string | null;
  declare successful_landings?: number | null;
  declare weight_kg?: number | null;
  declare year_built?: number | null;
  declare active: boolean;
  declare missions?: NonAttribute<Mission[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    Ship.init(
      {
         id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        model: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
        successful_landings: { type: DataTypes.INTEGER, allowNull: true },
        weight_kg: { type: DataTypes.FLOAT, allowNull: true },
        year_built: { type: DataTypes.INTEGER, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Ship;
  }
  public static associate({ Mission }): void {
    Ship.hasMany(Mission, { foreignKey: 'shipId', as: 'missions' });
  }
}

export { Ship, Ship as ShipAttributes };
