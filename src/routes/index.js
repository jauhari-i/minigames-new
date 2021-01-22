import express from 'express'
import path from 'path'
import { router as apiRoutes } from './api'

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.use('/api', apiRoutes)

export { router }
