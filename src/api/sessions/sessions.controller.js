import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { findUserByEmail } from '../users/users.dao.js'
import { isNullOrUndefined } from '../../helpers/object-helper'

const createSession = async (request, response) => {
  const { email, password } = request.body

  try {
    // Check if user exists in database by email
    const user = await findUserByEmail(email)
    if (isNullOrUndefined(user)) {
      throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
    }

    // Check if password is correct
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError(HttpStatus[401].statusCode, HttpStatus[401].message)
    }

    // Generate JWT
    const token = sign({}, process.env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    return response.status(201).json({ user, token })
  } catch (error) {
    if (error instanceof AppError) {
      throw response.status(error.statusCode).json({
        message: error.message,
      })
    }

    throw response.status(HttpStatus[500].statusCode).json({
      message: HttpStatus[500].message,
    })
  }
}

export { createSession }
