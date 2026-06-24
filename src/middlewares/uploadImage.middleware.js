import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

export const uploadImage = (req, res, next) => {
  if (req.is('multipart/form-data')) {
    return upload.single('image')(req, res, next)
  }
  next()
}
