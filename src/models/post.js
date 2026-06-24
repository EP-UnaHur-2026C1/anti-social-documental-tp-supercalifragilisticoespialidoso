import mongoose from 'mongoose'

const postImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
})

const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: {
      type: [postImageSchema],
      validate: {
        validator: (v) => v && v.length > 0,
        message: 'La publicación debe tener al menos una imagen',
      },
      required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  },
  { timestamps: true },
)

export const Post = mongoose.model('Post', postSchema)
