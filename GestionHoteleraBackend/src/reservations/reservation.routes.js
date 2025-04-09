import { Router } from 'express'
import { 
  registerReservation, 
  getAllReservations, 
  getMyReservations, 
  updateReservation, 
  deleteReservation 
} from './reservation.controller.js'

const api = Router()

api.post(
    '/register', 
    registerReservation
)

api.get(
    '/', 
    getAllReservations
)

api.get(
    '/:userId', 
    getMyReservations
)

api.put(
    '/:id', 
    updateReservation
)

api.delete(
    '/:id', 
    deleteReservation
)

export default api
