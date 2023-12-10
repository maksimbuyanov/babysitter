import { api } from './api.js'

export class ServerController {
  /** @type {import('axios').Axios} */
  api
  url = {
    getParameters: 'getParameters',
    changeTemp: 'changeTemp',
    changeHumidity: 'changeHumidity',
    getLastSleepInfo: 'getLastSleepInfo',
    updateWifi: 'wifiSettings',
  }

  hourInMs = 3600000

  /** @param {import('axios').Axios} apiInstance */
  constructor(apiInstance) {
    this.api = apiInstance
  }

  async updateWifi(wifiInfo) {
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

  async getLastSleepInfo() {
    try {
      const { data } = await this.api.get(this.url.getLastSleepInfo)

      const now = new Date()
      const lastSleep = new Date(data.lastSleep)

      if (!data.lastWake) {
        const sleepNow = ((now - lastSleep) / this.hourInMs).toFixed(1)

        return `Спит уже ${sleepNow} ч`
      }

      const messages = []
      const lastWake = new Date(data.lastWake)

      const wakeDuration = ((now - lastWake) / this.hourInMs).toFixed(1)

      messages.push(`Время бодрствования: ${wakeDuration} ч`)

      const sleepDuration = ((lastWake - lastSleep) / this.hourInMs).toFixed(1)

      messages.push(`Продолжительность последнего сна: ${sleepDuration} ч`)

      return messages.join('. ')
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  async changeHumidity(newHumidity) {
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

  async changeTemp(newTemp) {
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

  async getParameters() {
    try {
      const { data } = await this.api.get(this.url.getParameters)

      return `Температура: ${data.t}, влажность: ${data.h}`
    } catch (e) {
      return this.errorHandle(e)
    }
  }

  errorHandle(e) {
    return { message: e.message, title: 'Ошибка при обращении к серверу' }
  }
}

export default new ServerController(api)
