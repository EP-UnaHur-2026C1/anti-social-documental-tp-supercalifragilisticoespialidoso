import sharp from 'sharp'

export const optimizeImage = async (file) => {
  return await sharp(file.buffer).resize(800).webp({ effort: 3 }).toBuffer()
}
