import * as usersRepo from '../repositories/users.repository.js'
import { uploadImage } from '../services/cloudinary.service.js'

export const getAll = () => usersRepo.findAll()

export const getById = (id) => usersRepo.findByIdWithRelations(id)

export const create = async (data, file) => {
  if (file) {
    const result = await uploadImage(file)
    data.profile_picture_url = result.secure_url
  }
  return usersRepo.create(data)
}

export const update = (user, data) => usersRepo.update(user, data)

export const remove = (user) => usersRepo.remove(user)

export const follow = (follower, followed) => usersRepo.addFollowing(follower, followed)

export const unfollow = (follower, followed) => usersRepo.removeFollowing(follower, followed)
