import { Router } from 'express'
import { 
  registerReservation, 
  getAllReservations, 
  getMyReservations, 
  updateReservation, 
  deleteReservation, 
  getUsersReservations
} from './reservation.controller.js'

import {validRegisterReservation, validUpdateReservation} from '../../helpers/validators.js'

const api = Router()

api.post(
    '/register', 
    [   
        validRegisterReservation
    ],
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
    [
        validUpdateReservation
    ],
    updateReservation
)

api.delete(
    '/:id', 
    deleteReservation
)

api.post(
    '/getUserReservations',
    getUsersReservations
)

export default api
