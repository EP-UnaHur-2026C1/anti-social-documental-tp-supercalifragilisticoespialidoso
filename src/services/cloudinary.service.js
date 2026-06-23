const cloudinary = require('../config/cloudinary')
const streamifier = require('streamifier')
const { extractPublicId } = require('cloudinary-build-url')

const { optimizeImage } = require('./sharp.service')

const uploadImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error('File missing')
  }

  const optimizedBuffer = await optimizeImage(file)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error)
      }

      resolve(result)
    })

    streamifier.createReadStream(optimizedBuffer).pipe(uploadStream)
  })
}

const deleteImageByURL = async (imageURL) => {
  const publicId = extractPublicId(imageURL)

  if (!publicId) {
    throw new Error('Incorrect image URL')
  }

  const { result } = await cloudinary.uploader.destroy(publicId)

  if (result === 'not found') {
    throw new Error('Image not found')
  }

  return result
}

module.exports = {
  uploadImage,
  deleteImageByURL,
}
