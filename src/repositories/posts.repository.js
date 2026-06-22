import { Post, Comment } from '../models/index.js'

export const findAll = () => Post.find().populate('userId', '_id nickName').populate('tags')

export const findById = (id) => Post.findById(id)

export const findByIdWithRelations = async (id, commentCutoff) => {
  const post = await Post.findById(id).populate('userId', '_id nickName').populate('tags')
  if (!post) return null

  const comments = await Comment.find({
    postId: id,
    createdAt: { $gte: commentCutoff },
  }).populate('userId', '_id nickName')

  return { ...post.toObject(), comments }
}

export const create = (data) => Post.create(data)

export const update = (post, data) => {
  Object.assign(post, data)
  return post.save()
}

export const remove = (post) => post.deleteOne()

export const addImage = (postId, url) =>
  Post.findByIdAndUpdate(postId, { $push: { images: { url } } }, { new: true })

export const findImage = async (imageId, postId) => {
  const post = await Post.findById(postId)
  if (!post) return null
  const image = post.images.id(imageId)
  return image ? { post, image } : null
}

export const removeImage = async ({ post, image }) => {
  post.images.pull(image._id)
  return await post.save()
}

export const addTag = (post, tag) => {
  if (!post.tags.map(String).includes(String(tag._id))) post.tags.push(tag._id)
  return post.save()
}

export const removeTag = (post, tag) => {
  post.tags.pull(tag._id)
  return post.save()
}
