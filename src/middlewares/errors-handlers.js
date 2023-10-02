import { isCelebrateError } from 'celebrate'

import AppError from '../utils/AppError.js'
import HttpStatus from '../types/global.enums.js'

const exceptionHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  if (isCelebrateError(err)) {
    const details = Array.from(err.details.entries()).map(
      ([segment, joiError]) => ({
        source: segment,
        keys: joiError.details,
        message: joiError.message,
      }),
    )

    return res.status(HttpStatus[400].statusCode).json({
      message: HttpStatus[400].message,
      details,
    })
  }

  // Caso ocorra algum erro inesperado, retornar um erro 500
  return res.status(HttpStatus[500].statusCode).json({
    message: HttpStatus[500].message,
  })
}

export default exceptionHandler
