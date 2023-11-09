import { Router } from 'express'

import { createSession } from './sessions.controller.js'
import { validateCreateSessionSchema } from './sessions.middleware.js'

const router = Router()

router.post('/', [validateCreateSessionSchema, createSession])

export default router
