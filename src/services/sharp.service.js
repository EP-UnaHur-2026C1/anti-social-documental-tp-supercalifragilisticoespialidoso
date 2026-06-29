import sharp from 'sharp'

export const optimizeImage = async (file) => {
  return await sharp(file.buffer).resize(1200).webp().toBuffer()
}
