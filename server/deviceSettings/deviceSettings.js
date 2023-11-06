import { JsonSlice } from '../utils/json.js'
import { resolve } from 'path'

export const settings = new JsonSlice(resolve('server', 'moduleSettings.json'))
