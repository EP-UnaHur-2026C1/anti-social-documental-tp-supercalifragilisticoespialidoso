import * as postsRepo from '../repositories/posts.repository.js'
import { uploadImage } from './cloudinary.service.js'

export const getAll = (page, limit) => {
  const skip = (page - 1) * limit
  return postsRepo.findAll(skip, limit)
}
export const getById = (id, commentCutoff) =>
  commentCutoff ? postsRepo.findByIdWithRelations(id, commentCutoff) : postsRepo.findById(id)

export const create = async (data, file) => {
  const createData = {
    description: data.description,
    author: data.userId,
  }

  if (file) {
    const result = await uploadImage(file)
    createData.images = [{ url: result.secure_url }]
  } else if (data.images) {
    createData.images = data.images
  } else {
    const error = new Error('La publicación debe tener al menos una imagen')
    error.status = 400
    throw error
  }

  return postsRepo.create(createData)
}

export const update = (post, data) => postsRepo.update(post, data)

export const remove = (post) => postsRepo.remove(post)

export const findImage = (id, postId) => postsRepo.findImage(id, postId)
export const addImage = (postId, url) => postsRepo.addImage(postId, url)
export const removeImage = (image) => postsRepo.removeImage(image)

export const addTag = (post, tag) => postsRepo.addTag(post, tag)
export const removeTag = (post, tag) => postsRepo.removeTag(post, tag)
