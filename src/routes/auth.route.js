import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { schemaValidator } from '../middlewares/schemaValidator.middleware.js'
import { userSchema, loginSchema } from '../schemas/user.schema.js'

const router = Router()

router.post('/auth/register', schemaValidator(userSchema), authController.register)
router.post('/auth/login', schemaValidator(loginSchema), authController.login)

export { router }
