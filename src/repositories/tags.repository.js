import { Tag, Post } from '../models/index.js'

export const findAll = () => Tag.find()

export const findById = async (id) => {
  const tag = await Tag.findById(id)
  if (!tag) return null
  const posts = await Post.find({ tags: id }).populate('userId', '_id nickName')
  return { ...tag.toJSON(), posts }
}

export const findByIdSimple = (id) => Tag.findById(id)

export const create = (data) => Tag.create(data)

export const update = (tag, data) => {
  Object.assign(tag, data)
  return tag.save()
}

export const remove = (tag) => tag.deleteOne()
