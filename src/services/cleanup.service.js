import { User, Post, Comment, Tag } from '../models/index.js'

export const dropAllCollections = async () => {
  await User.deleteMany({})
  await Post.deleteMany({})
  await Comment.deleteMany({})
  await Tag.deleteMany({})
}
