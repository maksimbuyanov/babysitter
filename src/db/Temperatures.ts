import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './instance.js'

interface TempAttributes {
  time: Date
  temp: number
}

export interface TempInput extends Optional<TempAttributes, 'time'> {}
export interface TempOutput extends Required<TempAttributes> {}

export class Temperature
  extends Model<TempAttributes, TempInput>
  implements TempAttributes
{
  public readonly time!: Date
  public readonly temp!: number
}

Temperature.init(
  {
    time: {
      type: DataTypes.TIME,
      primaryKey: true,
      allowNull: false,
    },
    temp: {
      type: DataTypes.SMALLINT.UNSIGNED,
    },
  },
  {
    sequelize,
  }
)
