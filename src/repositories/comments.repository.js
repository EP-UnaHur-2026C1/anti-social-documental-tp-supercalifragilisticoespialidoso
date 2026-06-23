import { Comment } from '../models/index.js'

export const findAll = () =>
  Comment.find({ isVisible: true })
    .populate('userId', '_id nickName')
    .populate('postId', '_id description')

export const findById = (id) =>
  Comment.findById(id).populate('userId', '_id nickName').populate('postId', '_id description')

export const create = (data) => Comment.create(data)

export const update = (comment, data) => {
  Object.assign(comment, data)
  return comment.save()
}

export const remove = (comment) => comment.deleteOne()
