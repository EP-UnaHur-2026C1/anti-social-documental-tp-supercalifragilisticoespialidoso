import bcrypt from 'bcrypt'
import * as usersRepo from '../repositories/users.repository.js'

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

const comparePassword = (password, hash) => bcrypt.compare(password, hash)

export const register = async (data) => {
  const hashedPassword = await hashPassword(data.password)
  return usersRepo.create({
    nickName: data.nickName,
    email: data.email,
    name: data.name,
    password: hashedPassword,
  })
}

export const login = async (identifier, password) => {
  const isEmail = identifier.includes('@')
  const user = isEmail
    ? await usersRepo.findByEmail(identifier)
    : await usersRepo.findByNickname(identifier)

  if (!user) throw new Error('Credenciales inválidas')

  const isValid = await comparePassword(password, user.password)
  if (!isValid) throw new Error('Credenciales inválidas')

  return user
}
