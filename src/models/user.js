import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    nickName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      default:
        'https://media.istockphoto.com/id/1980276924/es/vector/sin-elemento-gr%C3%A1fico-en-miniatura-de-la-foto-no-se-ha-encontrado-ninguna-imagen-o-est%C3%A1.jpg?s=2048x2048&w=is&k=20&c=03lYDEXc3sSthiN8k4YnlpHecFbGdCPMjqBNWc0D5WM=',
    },
    bio: {
      type: String,
      default: '',
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true },
)

export const User = mongoose.model('User', userSchema)
