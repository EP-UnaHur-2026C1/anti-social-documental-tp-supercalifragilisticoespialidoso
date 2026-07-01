import { User, Comment } from '../models/index.js'

export const findAll = () => User.find()

export const findById = (id) => User.findById(id)

export const findByEmail = (email) => User.findOne({ email })

export const findByNickname = (nickName) => User.findOne({ nickName })

const embedComments = async (user) => {
  if (!user) return null
  const postIds = user.posts.map((p) => p._id)
  const comments = await Comment.find({ postId: { $in: postIds } }).populate(
    'userId',
    '_id nickName name profileImage',
  )
  const commentsByPost = comments.reduce((acc, c) => {
    const key = c.postId.toString()
    ;(acc[key] ??= []).push(c)
    return acc
  }, {})
  const posts = user.posts.map((p) => ({
    ...p.toJSON(),
    comments: commentsByPost[p._id.toString()] ?? [],
  }))
  return { ...user.toJSON(), posts }
}

export const findByIdWithRelations = async (id) => {
  const user = await User.findById(id)
    .populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
      populate: [{ path: 'author', select: '_id nickName name profileImage' }, { path: 'tags' }],
    })
    .populate('followers', '_id nickName name profileImage')
    .populate('following', '_id nickName name profileImage')
  return embedComments(user)
}

export const findByNicknameWithRelations = async (nickName) => {
  const user = await User.findOne({ nickName })
    .populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
      populate: [{ path: 'author', select: '_id nickName name profileImage' }, { path: 'tags' }],
    })
    .populate('followers', '_id nickName name profileImage')
    .populate('following', '_id nickName name profileImage')
  return embedComments(user)
}

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
