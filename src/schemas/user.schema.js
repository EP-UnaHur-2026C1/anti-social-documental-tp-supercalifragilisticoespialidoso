import Joi from 'joi'

export const userSchema = Joi.object({
  nickName: Joi.string().min(3).max(50).required().messages({
    'any.required': 'nickName es requerido',
    'string.min': 'nickName debe tener al menos {#limit} caracteres',
    'string.max': 'nickName puede tener hasta {#limit} caracteres',
    'string.empty': 'nickName no puede estar vacío',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'email es requerido',
    'string.email': 'email debe ser una dirección de correo válida',
    'string.empty': 'email no puede estar vacío',
  }),
  name: Joi.string().min(2).max(100).required().messages({
    'any.required': 'name es requerido',
    'string.min': 'name debe tener al menos {#limit} caracteres',
    'string.empty': 'name no puede estar vacío',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'password es requerido',
    'string.min': 'password debe tener al menos {#limit} caracteres',
    'string.empty': 'password no puede estar vacío',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })

export const loginSchema = Joi.object({
  identifier: Joi.string().min(3).required().messages({
    'any.required': 'identifier es requerido',
    'string.min': 'identifier debe tener al menos {#limit} caracteres',
    'string.empty': 'identifier no puede estar vacío',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password es requerido',
    'string.empty': 'password no puede estar vacío',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })

export const updateUserSchema = Joi.object({
  nickName: Joi.string().min(3).max(50).messages({
    'string.min': 'nickName debe tener al menos {#limit} caracteres',
    'string.max': 'nickName puede tener hasta {#limit} caracteres',
    'string.empty': 'nickName no puede estar vacío',
  }),
  email: Joi.string().email().messages({
    'string.email': 'email debe ser una dirección de correo válida',
    'string.empty': 'email no puede estar vacío',
  }),
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'name debe tener al menos {#limit} caracteres',
    'string.empty': 'name no puede estar vacío',
  }),
  profileImage: Joi.string().uri().messages({
    'string.uri': 'profileImage debe ser una URL válida',
  }),
  bio: Joi.string().max(500).messages({
    'string.max': 'bio puede tener hasta {#limit} caracteres',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })
