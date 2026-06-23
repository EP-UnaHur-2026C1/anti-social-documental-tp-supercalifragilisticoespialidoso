import * as commentsService from '../services/comments.service.js'
import mongoose from 'mongoose'

export const validateCommentId = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: 'Comentario no encontrado' })
  }

  const comment = await commentsService.getById(req.params.id)
  if (!comment) {
    return res.status(404).json({ error: 'Comentario no encontrado' })
  }
  req.comment = comment
  next()
}
