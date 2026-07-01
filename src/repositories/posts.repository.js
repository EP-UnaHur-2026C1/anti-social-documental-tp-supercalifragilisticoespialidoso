import mongoose from 'mongoose'
import { Post, Comment, User } from '../models/index.js'

export const findAll = async (skip, limit) => {
  const [posts, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .populate('author', '_id nickName name profileImage')
      .populate('tags')
      .skip(skip)
      .limit(limit),
    Post.countDocuments(),
  ])

  const postIds = posts.map((p) => p._id)
  const comments = await Comment.find({ postId: { $in: postIds } }).populate(
    'userId',
    '_id nickName name profileImage',
  )

  const commentsByPost = comments.reduce((acc, c) => {
    const key = c.postId.toString()
    ;(acc[key] ??= []).push(c)
    return acc
  }, {})

  const items = posts.map((p) => ({
    ...p.toJSON(),
    comments: commentsByPost[p._id.toString()] ?? [],
  }))

  return { items, total }
}

export const findById = (id) => Post.findById(id)

export const findByIdWithRelations = async (id, commentCutoff) => {
  const post = await Post.findById(id)
    .populate('author', '_id nickName name profileImage')
    .populate('tags')
  if (!post) return null

  const comments = await Comment.find({
    postId: id,
    createdAt: { $gte: commentCutoff },
  }).populate('userId', '_id nickName name profileImage')

  return { ...post.toJSON(), comments }
}

export const create = async (data) => {
  const post = await Post.create(data)
  await User.findByIdAndUpdate(data.author, { $push: { posts: post._id } })
  return post.populate('author', '_id nickName name profileImage')
}

export const update = (post, data) => {
  Object.assign(post, data)
  return post.save()
}

export const remove = async (post) => {
  await User.findByIdAndUpdate(post.author, { $pull: { posts: post._id } })
  return post.deleteOne()
}

export const addImage = async (postId, url) => {
  const post = await Post.findByIdAndUpdate(postId, { $push: { images: { url } } }, { new: true })
  const image = post.images[post.images.length - 1]
  return { id: image._id.toString(), _id: image._id, url: image.url, postId: postId.toString() }
}

export const findImage = async (imageId, postId) => {
  if (!mongoose.Types.ObjectId.isValid(imageId)) return null
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
