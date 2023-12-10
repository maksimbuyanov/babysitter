import { JsonSlice } from '../utils/json.js'
import { resolve } from 'node:path'

export const settings = new JsonSlice(resolve(__dirname, 'moduleSettings.json'))
