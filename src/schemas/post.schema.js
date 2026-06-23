import Joi from 'joi'

export const postSchema = Joi.object({
  description: Joi.string().min(1).required().messages({
    'any.required': 'description es requerida',
    'string.empty': 'description no puede estar vacía',
  }),
  userId: Joi.string().min(1).required().messages({
    'any.required': 'userId es requerido',
    'number.base': 'userId debe ser string',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })

export const updatePostSchema = Joi.object({
  description: Joi.string().min(1).required().messages({
    'any.required': 'description es requerida',
    'string.empty': 'description no puede estar vacía',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })
