import Axios from 'axios'
import 'dotenv/config'

export const api = Axios.create({ baseURL: process.env.SERVER_ADDRESS })

export const ENDPOINTS = {
  wifiSettings: 'wifiSettings',
  getLastSleepInfo: 'getLastSleepInfo',
  config: 'config',
}

export const url = process.env.BOT_UI_STATIC

export const STATIC = {
  configWifiForm: url + 'wifi',
}
