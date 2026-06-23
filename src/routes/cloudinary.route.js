// routes/cloudinary.route.js

import { Router } from 'express'
import multer from 'multer'

import { uploadTestImage } from '../controllers/cloudinary.controller.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
})

router.post('/cloudinary/test-upload', upload.single('image'), uploadTestImage)

export { router }
