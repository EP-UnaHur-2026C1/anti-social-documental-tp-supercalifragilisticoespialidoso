// controllers/cloudinary.controller.js

import { uploadImage } from '../services/cloudinary.service.js'

export const uploadTestImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image provided',
      })
    }

    const result = await uploadImage(req.file)

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
