import mongoose from 'mongoose'
import * as postsService from '../services/posts.service.js'
export const validatePostId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: `Post con id ${req.params.id} no encontrado` })
  }

  const post = await postsService.getById(req.params.id)
  if (!post) {
    return res.status(404).json({ error: `Post con id ${req.params.id} no encontrado` })
  }
  req.post = post
  next()
}
