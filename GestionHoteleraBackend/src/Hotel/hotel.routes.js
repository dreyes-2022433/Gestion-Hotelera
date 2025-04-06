import { Router } from 'express'
import { deleteHotel, getAllHotels, getHotelByName, getOneHotel, hotelRegister, updateHotel } from './hotel.controller.js'

const api = Router()

//Rutas

//Agregar Hotel
api.post(
    '/register', hotelRegister
)

//Listar Hoteles
api.get(
    '/getHotels', 
    getAllHotels
)

//Buscar Hotel por ID
api.get(
    '/getHotels/:name',
    getHotelByName
)

//Listar Hoteles
api.get(
    '/:id', 
    getOneHotel
)

//Actualizar Hotel
api.put(
    '/:id',
    updateHotel
)

//Eliminar Hotel
api.delete(
    '/:id',
    deleteHotel
)
export default api