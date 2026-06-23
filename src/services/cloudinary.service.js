import { cloudinary } from '../config/cloudinary.js'
import streamifier from 'streamifier'

import { optimizeImage } from './sharp.service.js'

export const uploadImage = async (file) => {
  if (!file?.buffer) {
    throw new Error('File missing')
  }

  const optimizedBuffer = await optimizeImage(file)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error)
        return
      }

      resolve(result)
    })

    streamifier.createReadStream(optimizedBuffer).pipe(uploadStream)
  })
}
