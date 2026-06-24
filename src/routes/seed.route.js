import { Router } from 'express'
import * as seedController from '../controllers/seed.controller.js'

const router = Router()

router.post('/seed', seedController.seed)

export { router }
