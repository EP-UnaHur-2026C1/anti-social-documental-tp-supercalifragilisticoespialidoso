import { Router } from 'express'
import * as usersController from '../controllers/users.controller.js'
import { schemaValidator } from '../middlewares/schemaValidator.middleware.js'
import { userSchema, updateUserSchema } from '../schemas/user.schema.js'
import { validateUserId } from '../middlewares/validateUserId.middleware.js'
import { validateFollow } from '../middlewares/validateFollow.middleware.js'
import { uploadProfileImage } from '../middlewares/uploadProfileImage.middleware.js'
import { validateNickname } from '../middlewares/validateNickname.middleware.js'

const router = Router()

router.get('/users', usersController.getAll)
router.get('/users/:id', validateUserId, usersController.getById)
router.get('/users/nickname/:nickname', validateNickname, usersController.getByNickname)

router.post('/users', schemaValidator(userSchema), usersController.create)
router.put(
  '/users/:id',
  validateUserId,
  uploadProfileImage,
  schemaValidator(updateUserSchema),
  usersController.update,
)
router.delete('/users/:id', validateUserId, usersController.remove)

router.get('/users/:id/followers', validateUserId, usersController.getFollowers)
router.get('/users/:id/following', validateUserId, usersController.getFollowing)
router.get('/users/:id/posts', validateUserId, usersController.getPosts)

router.post('/users/:followerId/follow/:followedId', validateFollow, usersController.follow)
router.delete('/users/:followerId/unfollow/:followedId', validateFollow, usersController.unfollow)

export { router }
