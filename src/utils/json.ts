import { readFileSync, writeFileSync } from 'fs'
import Crypto from 'crypto-js'

export class JsonSlice {
  path: string

  constructor(absolutePath: string) {
    this.path = absolutePath
  }

  read() {
    try {
      const data = readFileSync(this.path)
      console.log(data)
      return JSON.parse(data as unknown as string)
    } catch (e) {
      console.error(e)
      return {}
    }
  }

  updateFields(newObject: Record<string, string>) {
    const oldJson = this.read()

    writeFileSync(this.path, JSON.stringify({ ...oldJson, ...newObject }))
  }

  updateCryptoFields(newObject: Record<string, string>) {
    const keys = Object.keys(newObject)
    const cryptoObj = keys.reduce(
      (acc, key) => {
        // const bytes  = Crypto.AES.decrypt(ciphertext, process.env.CRYPTO_KEY);
        // const originalText = bytes.toString(Crypto.enc.Utf8);
        acc[key] = Crypto.AES.encrypt(
          newObject[key],
          process.env.CRYPTO_KEY ?? ''
        ).toString()
        return acc
      },
      {} as Record<string, string>
    )

    this.updateFields(cryptoObj)
  }
}
