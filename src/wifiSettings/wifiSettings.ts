import { JsonSlice } from '../utils/json.js'
import { resolve } from 'path'

export const wifi = new JsonSlice(resolve(__dirname, 'wifiSettings.json'))
