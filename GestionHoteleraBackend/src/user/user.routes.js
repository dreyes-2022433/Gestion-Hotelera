import { Router } from 'express';
import { validUpdateUser } from '../../helpers/validators.js';
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changeUserRole
} from './user.controller.js'

const api = Router()

api.get(
  '/me/:id',
  [validateJwt], 
  getUserProfile
)

api.put(
  '/me/:id',
  [validateJwt, validUpdateUser],
  updateUserProfile
)

api.delete(
  '/me/:id',
  [validateJwt],
  deleteUserAccount
)

api.get(
  '/',
  [validateJwt, isAdmin],
  getAllUsers
)

api.get(
  '/:id',
  [validateJwt, isAdmin],
  getUserById
)

api.put(
  '/:id',
  [validateJwt, isAdmin, validUpdateUser],
  updateUserById
)

api.delete(
  '/:id',
  [validateJwt, isAdmin],
  deleteUserById
)

api.put(
  '/:id/role',
  [validateJwt, isAdmin],
  changeUserRole
)

export default api
