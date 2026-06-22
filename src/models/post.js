import mongoose from 'mongoose'

const postImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
})

const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [postImageSchema],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  },
  { timestamps: true },
)

export const Post = mongoose.model('Post', postSchema)
