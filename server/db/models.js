import { Temperature } from './Temperatures.js'

export { Temperature }

export function initModels(sequelize) {
  Temperature.initModel(sequelize)

  return {
    Temperature,
  }
}
