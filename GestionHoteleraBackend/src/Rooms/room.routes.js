import { Router } from 'express';

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
  [validateJwt, isAdmin,],
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
  [validateJwt, isAdmin, ],
  updateRoom
)

api.delete(
  '/:id',
  [validateJwt, isAdmin],
  deleteRoom
)

export default api
