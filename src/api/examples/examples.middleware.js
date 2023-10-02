import { celebrate, Joi, Segments } from 'celebrate'

import { findExampleByField1, findExampleByID } from './examples.dao.js'

import AppError from '../../utils/AppError.js'
import HttpStatus from '../../types/global.enums.js'
import { paginationBaseSchema } from '../../helpers/validations-helper.js'
import { isDefined, isNullOrUndefined } from '../../helpers/object-helper.js'

const paramsBaseSchema = {
  exampleID: Joi.number().required(),
}

const validateCreateExampleSchema = celebrate({
  [Segments.BODY]: {
    field1: Joi.string().required(),
    field2: Joi.string().required(),
  },
})

const validateFetchExamplesSchema = celebrate({
  [Segments.QUERY]: {
    ...paginationBaseSchema,
    field1: Joi.string().optional(),
    field2: Joi.string().optional(),
  },
})

const validateFetchExampleSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateEditExampleSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
  [Segments.BODY]: {
    field1: Joi.string().optional(),
    field2: Joi.string().optional(),
  },
})

const validateRemoveExampleSchema = celebrate({
  [Segments.PARAMS]: paramsBaseSchema,
})

const validateUniqueExample = async (request, _response, next) => {
  const {
    body: { field1 },
  } = request

  const example = await findExampleByField1(field1)

  if (isDefined(example)) {
    throw new AppError(HttpStatus[409].statusCode, HttpStatus[409].message)
  }
  next()
}

const validateExampleExistence = async (request, _response, next) => {
  const { query, params, body } = request

  const exampleID = params.exampleID || query.exampleID || body.exampleID

  const example = await findExampleByID(exampleID)

  if (isNullOrUndefined(example)) {
    throw new AppError(HttpStatus[404].statusCode, HttpStatus[404].message)
  }

  request.locals.example = example

  next()
}

export {
  validateCreateExampleSchema,
  validateFetchExamplesSchema,
  validateFetchExampleSchema,
  validateEditExampleSchema,
  validateRemoveExampleSchema,
  validateUniqueExample,
  validateExampleExistence,
}
