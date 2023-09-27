import 'express-async-errors'

import cors from 'cors'
import express from 'express'

import './config/dotenv.js'
import './config/db.js'

import AppError from './utils/AppError.js'
// import routes from './routes'

const app = express()

// Use Cors
app.use(cors())

// Use Body Parser JSON Middleware
app.use(express.json())

// Routes
// app.use(routes)

// Use Error Handler
app.use((error, req, res, _next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  })
})

export default app
