import {
  insertExample,
  findAndCountExamples,
  updateExample,
  deleteExample,
} from './examples.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'

const createExample = async (request, response) => {
  const { body } = request

  try {
    const user = await insertExample(body)

    return response.status(201).json(user)
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

const fetchExamples = async (request, response) => {
  const { query } = request

  try {
    const { data, count } = await findAndCountExamples(query)

    response.set('x-count', count)

    response.status(200).json(data)
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

const fetchExample = async (request, response) => {
  const { locals } = request

  try {
    const { example } = locals

    response.status(200).json(example)
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

const editExample = async (request, response) => {
  const { params, body } = request

  try {
    const { exampleID } = params

    const example = await updateExample(exampleID, body)

    response.status(200).json(example)
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

const removeExample = async (request, response) => {
  const { params } = request

  try {
    const { exampleID } = params

    await deleteExample(exampleID)

    response.status(204).end()
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

export {
  createExample,
  fetchExamples,
  fetchExample,
  editExample,
  removeExample,
}
