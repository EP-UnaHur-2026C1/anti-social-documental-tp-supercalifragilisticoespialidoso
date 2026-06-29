import * as userService from '../services/users.service.js'

export const validateNickname = async (req, res, next) => {
  const { nickname } = req.params

  const user = await userService.getByNickname(nickname)

  if (!user) {
    return res.status(404).json({
      error: `Usuario con nickname ${nickname} no encontrado`,
    })
  }

  req.user = user
  next()
}
