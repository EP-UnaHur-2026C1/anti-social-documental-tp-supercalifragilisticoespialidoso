import { User, Post, Comment, Tag } from '../models/index.js'

export const dropAllCollections = async (req, res, next) => {
  try {
    await User.deleteMany({})
    await Post.deleteMany({})
    await Comment.deleteMany({})
    await Tag.deleteMany({})
    res.json({ message: 'Todas las colecciones han sido eliminadas' })
  } catch (err) {
    next(err)
  }
}
