import * as cleanupService from '../services/cleanup.service.js'

export const dropAllCollections = async (req, res, next) => {
  try {
    await cleanupService.dropAllCollections()
    res.json({ message: 'Todas las colecciones han sido eliminadas' })
  } catch (err) {
    next(err)
  }
}
