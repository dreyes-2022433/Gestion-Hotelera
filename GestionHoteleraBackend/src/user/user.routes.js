import { Router } from 'express'
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


api.get('/me/:id', getUserProfile)
api.put('/me/:id', updateUserProfile)
api.delete('/me/:id', deleteUserAccount)

api.get('/', getAllUsers)
api.get('/:id', getUserById)
api.put('/:id', updateUserById)
api.delete('/:id', deleteUserById)
api.put('/:id/role', changeUserRole)

export default api
