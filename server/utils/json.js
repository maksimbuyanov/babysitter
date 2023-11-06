import { readFileSync, writeFileSync } from 'fs'
import Crypto from 'crypto-js'

export class JsonSlice {
  path

  constructor(absolutePath) {
    this.path = absolutePath
  }

  read() {
    try {
      const data = readFileSync(this.path, err => {
        throw err
      })
      return JSON.parse(data)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  updateFields(newObject) {
    const oldJson = this.read()

    writeFileSync(
      this.path,
      JSON.stringify({ ...oldJson, ...newObject }),
      err => {
        throw err
      }
    )
  }

  updateCryptoFields(newObject) {
    const keys = Object.keys(newObject)
    const cryptoObj = keys.reduce((acc, key) => {
      // const bytes  = Crypto.AES.decrypt(ciphertext, process.env.CRYPTO_KEY);
      // const originalText = bytes.toString(Crypto.enc.Utf8);
      acc[key] = Crypto.AES.encrypt(
        newObject[key],
        process.env.CRYPTO_KEY
      ).toString()
      return acc
    }, {})

    this.updateFields(cryptoObj)
  }
}
