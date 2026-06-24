import bcrypt from 'bcrypt'
import { User, Post, Tag, Comment } from '../models/index.js'

const generateDummyData = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user = await User.create({
    nickName: `user_${Date.now()}`,
    email: `user_${Date.now()}@example.com`,
    name: 'Usuario Demo',
    password: hashedPassword,
    bio: 'Este es un usuario de demostración',
    profileImage:
      'https://media.istockphoto.com/id/1980276924/es/vector/sin-elemento-gr%C3%A1fico-en-miniatura-de-la-foto-no-se-ha-encontrado-ninguna-imagen-o-est%C3%A1.jpg?s=2048x2048&w=is&k=20&c=03lYDEXc3sSthiN8k4YnlpHecFbGdCPMjqBNWc0D5WM=',
  })

  const tags = await Tag.insertMany([
    { name: 'tecnologia' },
    { name: 'desarrollo' },
    { name: 'javascript' },
  ])

  const post = await Post.create({
    description: 'Mi primer post con datos dummy',
    userId: user._id,
    images: [
      {
        url: 'https://via.placeholder.com/600x400?text=Demo+Image+1',
      },
      {
        url: 'https://via.placeholder.com/600x400?text=Demo+Image+2',
      },
    ],
    tags: [tags[0]._id, tags[1]._id],
  })

  const comments = await Comment.insertMany([
    {
      text: 'Excelente post!',
      userId: user._id,
      postId: post._id,
    },
    {
      text: 'Muy interesante, gracias por compartir',
      userId: user._id,
      postId: post._id,
    },
  ])

  user.posts.push(post._id)
  await user.save()

  return {
    user: {
      id: user._id,
      nickName: user.nickName,
      email: user.email,
    },
    post: {
      id: post._id,
      description: post.description,
      imagesCount: post.images.length,
    },
    tags: tags.map((t) => ({ id: t._id, name: t.name })),
    commentsCount: comments.length,
  }
}

export const seed = async (req, res, next) => {
  try {
    const data = await generateDummyData()
    res.status(201).json({
      message: 'Datos dummy creados exitosamente',
      data,
    })
  } catch (err) {
    next(err)
  }
}
