import express from 'express'
import configureApp from '../config/configureApp'
import { getConfig } from '../config/global_config'
import { db as mysqlConnection } from '../db/mysqlConnection'

const port = getConfig('/port')
const app = express()

configureApp(app)

mysqlConnection
  .getConnection()
  .then(() => {
    console.log('Connected to database')
  })
  .catch(err => console.log(err))

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
