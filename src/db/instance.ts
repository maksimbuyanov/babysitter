import { Sequelize } from 'sequelize'
import type { Dialect } from 'sequelize'
import 'dotenv/config'

export const sequelize = new Sequelize({
  host: process.env.DB_ADDRESS,
  dialect: process.env.DB_DIALECT as Dialect,
  database: process.env.DB_BASE,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASS,
})
