import { TempInput, TempOutput } from '../../db/Temperatures.js'
import * as tempDal from '../../db/dal/Temperatures.js'

export const create = (payload: TempInput): Promise<TempOutput> => {
  return tempDal.create(payload)
}
export const update = (
  id: number,
  payload: Partial<TempInput>
): Promise<TempOutput> => {
  return tempDal.update(id, payload)
}
export const getById = (id: number): Promise<TempOutput> => {
  return tempDal.getById(id)
}
export const getByRange = (
  dateOne: Date,
  dataTwo: Date
): Promise<TempOutput[]> => {
  return tempDal.getByRange(dateOne, dataTwo)
}
