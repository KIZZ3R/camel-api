import { Router } from 'express'

import examplesRouter from './examples/examples.router.js'

const router = Router()

router.use('/examples', examplesRouter)

export default router
