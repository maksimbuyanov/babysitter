import type { AxiosInstance } from 'axios'
import { api } from './api.js'

export class ServerController {
  api
  url = {
    getParameters: 'getParameters',
    changeTemp: 'changeTemp',
    changeHumidity: 'changeHumidity',
    getLastSleepInfo: 'getLastSleepInfo',
    updateWifi: 'wifiSettings',
  }

  hourInMs = 3600000

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async updateWifi(wifiInfo: any) {
    try {
      const { data } = await this.api.put(this.url.updateWifi, wifiInfo)
      if (data.success) {
        return 'Успешно'
      } else {
        throw new Error('Ошибка сервера')
      }
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getLastSleepInfo() {
    try {
      const { data } = await this.api.get(this.url.getLastSleepInfo)

      const now = new Date()
      const lastSleep = new Date(data.lastSleep)

      if (!data.lastWake) {
        const sleepNow = ((+now - +lastSleep) / this.hourInMs).toFixed(1)

        return `Спит уже ${sleepNow} ч`
      }

      const messages = []
      const lastWake = new Date(data.lastWake)

      const wakeDuration = ((+now - +lastWake) / this.hourInMs).toFixed(1)

      messages.push(`Время бодрствования: ${wakeDuration} ч`)

      const sleepDuration = ((+lastWake - +lastSleep) / this.hourInMs).toFixed(
        1
      )

      messages.push(`Продолжительность последнего сна: ${sleepDuration} ч`)

      return messages.join('. ')
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async changeHumidity(newHumidity: any) {
    try {
      const { data } = await this.api.put(this.url.changeHumidity, {
        newHumidity,
      })
      if (data.success) {
        return 'Успешно'
      } else {
        throw new Error('Ошибка сервера')
      }
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async changeTemp(newTemp: any) {
    try {
      const { data } = await this.api.put(this.url.changeTemp, {
        newTemp,
      })
      if (data.success) {
        return 'Успешно'
      } else {
        throw new Error('Ошибка сервера')
      }
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getParameters() {
    try {
      const { data } = await this.api.get(this.url.getParameters)

      return `Температура: ${data.t}, влажность: ${data.h}`
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  errorHandle(e: any) {
    return { message: e.message, title: 'Ошибка при обращении к серверу' }
  }
}

export default new ServerController(api)
