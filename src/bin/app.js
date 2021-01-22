import express from 'express'
import configureApp from '../config/configureApp'
import { getConfig } from '../config/global_config'
import connectMongo from '../db/mongoConnection'
import mongoose from 'mongoose'

const port = getConfig('/port')
const app = express()

configureApp(app)
connectMongo(mongoose)

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
