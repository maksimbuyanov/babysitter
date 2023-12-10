import { Op } from 'sequelize'
import { Temperature } from '../Temperatures.js'
import type { TempInput, TempOutput } from '../Temperatures.js'

export const create = async (payload: TempInput): Promise<TempOutput> => {
  const temp = await Temperature.create(payload)
  return temp
}

export const update = async (
  id: number,
  payload: Partial<TempInput>
): Promise<TempOutput> => {
  const ingredient = await Temperature.findByPk(id)
  if (!ingredient) {
    // @todo throw custom error
    throw new Error('not found')
  }
  const updatedIngredient = await (ingredient as Temperature).update(payload)
  return updatedIngredient
}

export const getById = async (id: number): Promise<TempOutput> => {
  const ingredient = await Temperature.findByPk(id)
  if (!ingredient) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return ingredient
}

export const getByRange = async (
  dateOne: Date,
  dataTwo: Date
): Promise<TempOutput[]> => {
  const collections = await Temperature.findAll({
    where: {
      time: {
        [Op.between]: [dateOne, dataTwo],
      },
    },
  })
  if (!collections?.length) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return collections
}
