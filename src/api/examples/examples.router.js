import { Router } from 'express'

import {
  createExample,
  fetchExamples,
  fetchExample,
  editExample,
  removeExample,
} from './examples.controller.js'
import {
  validateCreateExampleSchema,
  validateFetchExamplesSchema,
  validateFetchExampleSchema,
  validateEditExampleSchema,
  validateRemoveExampleSchema,
  validateUniqueExample,
  validateExampleExistence,
} from './examples.middleware.js'

const router = Router()

router.post('/', [
  validateCreateExampleSchema,
  validateUniqueExample,
  createExample,
])

router.get('/', [validateFetchExamplesSchema, fetchExamples])

router.get('/:exampleID', [
  validateFetchExampleSchema,
  validateExampleExistence,
  fetchExample,
])

router.put('/:exampleID', [
  validateEditExampleSchema,
  validateExampleExistence,
  validateUniqueExample,
  editExample,
])

router.delete('/:exampleID', [
  validateRemoveExampleSchema,
  validateExampleExistence,
  removeExample,
])

export default router
