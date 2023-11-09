import { Router } from 'express'

import examplesRouter from './examples/examples.router.js'
import sessionsRouter from './sessions/sessions.router.js'

const router = Router()

router.use('/examples', examplesRouter)
router.use('/sessions', sessionsRouter)

export default router
