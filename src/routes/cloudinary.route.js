// routes/cloudinary.route.js

import { Router } from 'express'
import multer from 'multer'

import { uploadTestImage } from '../controllers/cloudinary.controller.js'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

router.post('/cloudinary/test-upload', upload.single('image'), uploadTestImage)

export { router }
