import { Router } from 'express';
import { validRegisterRoom, validUpdateRoom } from '../../helpers/validators.js';
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from './room.controller.js'

const api = Router()

api.post(
  '/',
  [validateJwt, isAdmin, validRegisterRoom],
  createRoom
)

api.get(
  '/',
  getRooms
)

api.get(
  '/:id',
  getRoomById
)

api.put(
  '/:id',
  [validateJwt, isAdmin, validUpdateRoom],
  updateRoom
)

api.delete(
  '/:id',
  [validateJwt, isAdmin],
  deleteRoom
)

export default api
