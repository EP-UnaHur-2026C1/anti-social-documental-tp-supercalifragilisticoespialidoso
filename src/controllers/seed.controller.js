import * as seedService from '../services/seed.service.js'

export const seed = async (req, res, next) => {
  try {
    const data = await seedService.generateDummyData()
    res.status(201).json({ message: 'Datos dummy creados exitosamente', data })
  } catch (err) {
    next(err)
  }
}
