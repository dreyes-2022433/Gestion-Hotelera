import { Router } from 'express'
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from './room.controller.js'

const api = Router()

api.post('/', createRoom)
api.get('/', getRooms)
api.get('/:id', getRoomById)
api.put('/:id', updateRoom)
api.delete('/:id', deleteRoom)

export default api