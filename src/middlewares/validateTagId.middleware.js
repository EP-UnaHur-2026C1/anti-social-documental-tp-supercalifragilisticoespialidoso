import mongoose from 'mongoose'
import * as tagsService from '../services/tags.service.js'

export const validateTagId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: `Tag con id ${req.params.id} no encontrado` })
  }
  const tag = await tagsService.getByIdSimple(req.params.id)
  if (!tag) {
    return res.status(404).json({ error: `Tag con id ${req.params.id} no encontrado` })
  }
  req.tag = tag
  next()
}
