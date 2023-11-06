import { DataTypes, Model } from 'sequelize'

export class Temperature extends Model {
  time
  temp

  static initModel(sequelize) {
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

    return Temperature
  }
}
