import express from 'express'
import path from 'path'
// import { router as apiRoutes } from './api'
import { router as newRoutes } from '../micro/api'

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// router.use('/api', apiRoutes)

router.use('/api', newRoutes)

export { router }
