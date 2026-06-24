import { User } from '../models/index.js'

export const findAll = () => User.find()

export const findById = (id) => User.findById(id)

export const findByEmail = (email) => User.findOne({ email })

export const findByIdWithRelations = (id) =>
  User.findById(id)
    .populate({
      path: 'posts',
      populate: [{ path: 'author', select: '_id nickName name profileImage' }, { path: 'tags' }],
    })
    .populate('followers', '_id nickName name')
    .populate('following', '_id nickName name')

export const findByIdWithFollowers = (id) =>
  User.findById(id).populate('followers', '_id nickName name')

export const findByIdWithFollowing = (id) =>
  User.findById(id).populate('following', '_id nickName name')

export const create = (data) => User.create(data)

export const update = (user, data) => {
  Object.assign(user, data)
  return user.save()
}

export const remove = (user) => user.deleteOne()

export const addFollowing = async (follower, followed) => {
  follower.following.push(followed._id)
  followed.followers.push(follower._id)
  await Promise.all([follower.save(), followed.save()])
}

export const removeFollowing = async (follower, followed) => {
  follower.following.pull(followed._id)
  followed.followers.pull(follower._id)
  await Promise.all([follower.save(), followed.save()])
}
