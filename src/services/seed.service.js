import bcrypt from 'bcrypt'
import { User, Post, Tag, Comment } from '../models/index.js'

export const generateDummyData = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await User.create({
    nickName: `user_${Date.now()}`,
    email: `user_${Date.now()}@example.com`,
    name: 'Mariana Sanchez',
    password: hashedPassword,
    bio: 'Este es un usuario de demostración',
    profileImage: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1044',
  })

  const tags = await Tag.insertMany([
    { name: 'tecnologia' },
    { name: 'desarrollo' },
    { name: 'javascript' },
  ])

  const post = await Post.create({
    description: 'Mi primer post con datos dummy',
    author: user._id,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=100&w=687&auto=format',
      },
      {
        url: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=100&w=687&auto=format',
      },
    ],
    tags: [tags[0]._id, tags[1]._id],
  })

  const comments = await Comment.insertMany([
    { text: 'Excelente post!', userId: user._id, postId: post._id },
    { text: 'Muy interesante, gracias por compartir', userId: user._id, postId: post._id },
  ])

  user.posts.push(post._id)

  await user.save()

  return {
    user: { id: user._id, nickName: user.nickName, email: user.email },
    post: { id: post._id, description: post.description, imagesCount: post.images.length },
    tags: tags.map((t) => ({ id: t._id, name: t.name })),
    commentsCount: comments.length,
  }
}
