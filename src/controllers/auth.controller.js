import * as authService from '../services/auth.service.js'

export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(201).json({ message: 'Usuario registrado exitosamente', user })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body.email, req.body.password)
    res.json({ message: 'Login exitoso', user })
  } catch (err) {
    const status = err.message === 'Credenciales inválidas' ? 401 : 500
    next({ status, message: err.message })
  }
}
