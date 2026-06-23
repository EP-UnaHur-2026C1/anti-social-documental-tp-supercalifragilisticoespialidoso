import Joi from 'joi'

export const commentSchema = Joi.object({
  text: Joi.string().min(1).required().messages({
    'any.required': 'text es requerido',
    'string.empty': 'text no puede estar vacío',
  }),
  postId: Joi.string().min(1).required().messages({
    'any.required': 'postId es requerido',
    'string.empty': 'postId no puede estar vacío',
  }),
  userId: Joi.string().min(1).required().messages({
    'any.required': 'userId es requerido',
    'string.empty': 'userId no puede estar vacío',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })

export const updateCommentSchema = Joi.object({
  text: Joi.string().min(1).required().messages({
    'any.required': 'text es requerido',
    'string.empty': 'text no puede estar vacío',
  }),
})
  .unknown(false)
  .messages({
    'object.unknown': 'El atributo {#label} no está permitido.',
  })
