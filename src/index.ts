import express from 'express'
import 'dotenv/config'
import * as path from 'node:path'

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/wifi', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'wifi', 'index.html'))
})

const port = process.env.SERVER_PORT ?? 3000

app
  .route('/config')
  .get((req, res, next) => {
    // res.json(settings.read())
  })
  .put((req, res, next) => {
    try {
      // settings.updateFields(req.body)
      res.json({ success: true })
    } catch (e) {
      res.json({ success: false })
    }
  })

app
  .route('/wifiSettings')
  .get((req, res, next) => {
    // res.json(wifi.read())
  })
  .put((req, res, next) => {
    try {
      // wifi.updateCryptoFields(req.body)
      res.json({ success: true })
    } catch (e) {
      console.log(e)
      res.json({ success: false })
    }
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getLastSleepInfo', (req, res) => {
  const flag = new Date().getMinutes() % 2
  if (flag) {
    res.json({
      lastSleep: new Date(Number(new Date()) - 1000 * 60 * 60 * 14),
      lastWake: new Date(Number(new Date()) - 1000 * 60 * 60 * 4),
    })
  } else {
    res.json({
      lastSleep: new Date(Number(new Date()) - 1000 * 60 * 60 * 6),
    })
  }
})

app.listen(port, async () => {
  try {
    // await sequelize.authenticate()
    // initModels(sequelize)
    // dbInit()

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
