'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 

import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import reportRoutes from '../src/report/report.routes.js'
import evetsRoutes from '../src/Events/events.routes.js'
import roomRoutes from '../src/Rooms/room.routes.js'
import hotelRoutes from '../src/Hotel/hotel.routes.js'
import reservationRoutes from '../src/reservations/reservation.routes.js'
import factureRoutes from '../src/Facture/facture.routes.js'

const configs = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
}

const routes = (app)=>{
  app.use('/api/auth', authRoutes)
  app.use('/v1/user', userRoutes)
  app.use('/v1/report', reportRoutes)
  app.use('/v1/hotel', hotelRoutes)
  app.use('/v1/event', evetsRoutes)
  app.use('/api/rooms', roomRoutes)
  app.use('/v1/reservations', reservationRoutes)
  app.use('/v1/facture', factureRoutes)
   
}

export const initServer = async () => {
  const app = express()

  try {
    configs(app)
    routes(app)
    app.listen(process.env.PORT)
    console.log(`Server running on port ${process.env.PORT}`)
  } catch (err) {
    console.error('Server init failed', err)
  }
}
