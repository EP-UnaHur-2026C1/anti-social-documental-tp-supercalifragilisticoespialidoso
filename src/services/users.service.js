import * as usersRepo from '../repositories/users.repository.js'
import { uploadImage } from './cloudinary.service.js'

export const getAll = () => usersRepo.findAll()

export const getById = (id) => usersRepo.findByIdWithRelations(id)

export const create = (data) => usersRepo.create(data)

export const update = async (user, data, file) => {
  const updateData = { ...data }

  if (file) {
    const result = await uploadImage(file)
    updateData.profileImage = result.secure_url
  }

  return usersRepo.update(user, updateData)
}

export const remove = (user) => usersRepo.remove(user)

export const follow = (follower, followed) => usersRepo.addFollowing(follower, followed)

export const unfollow = (follower, followed) => usersRepo.removeFollowing(follower, followed)
