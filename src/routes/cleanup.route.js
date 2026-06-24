import { Router } from 'express'
import * as cleanupController from '../controllers/cleanup.controller.js'

const router = Router()

router.delete('/cleanup/collections', cleanupController.dropAllCollections)

export { router }
