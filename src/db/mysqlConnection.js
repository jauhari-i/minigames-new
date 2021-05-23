import { getConfig } from '../config/global_config'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
const mysqlConfig = getConfig('/mysqlConfig')

const db = mysql.createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  Promise: bluebird,
})

export { db }
