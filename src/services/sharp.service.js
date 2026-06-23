const sharp = require('sharp')

const optimizeImage = async (file) => {
  return await sharp(file.buffer).resize(800).webp({ effort: 3 }).toBuffer()
}

module.exports = {
  optimizeImage,
}
