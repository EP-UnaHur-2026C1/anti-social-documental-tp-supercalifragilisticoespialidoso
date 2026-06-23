import mongoose from 'mongoose'
import { User } from './user.js'
import { Post } from './post.js'
import { Comment } from './comment.js'
import { Tag } from './tag.js'

mongoose.set('toJSON', { virtuals: true })

export { User, Post, Comment, Tag, mongoose }
