import { Router } from 'express'
import { validRegisterHotel, validUpdateHotel } from '../../helpers/validators.js'
import { deleteHotel, getAllHotels, getHotelByName, getOneHotel, hotelRegister, updateHotel } from './hotel.controller.js'

import  upload  from '../../middlewares/multer.js'
import cloudinary from '../../configs/cloudinary.js'
import Hotel from './hotel.model.js'


const api = Router()

//Rutas

//Agregar Hotel
api.post(
    '/register', 
    [
        validRegisterHotel
    ],  
    hotelRegister
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
    [
        validUpdateHotel
    ],
    updateHotel
)

//Eliminar Hotel
api.delete(
    '/:id',
    deleteHotel
)

api.post('/upload', upload.single('image'), (req, res) => {
    try {
        const { id } = req.body
        console.log('ID:', id)
        console.log('req.file:', req.file)
        console.log('req.body:', req.body)
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'hotelsimages' },
            (error, result) => {
                if (error) {
                    console.error('Error uploading image:', error)
                    return res.status(500).send({ message: 'Error uploading image' })
                }
                console.log('Image uploaded:', result.secure_url)
                Hotel.findByIdAndUpdate(
                    id,
                    { imageUrl: result.secure_url },
                    { new: true }
                )
                .then(updatedHotel => {
                    if (!updatedHotel) {
                        return res.status(404).send({ message: 'Hotel not found' })
                    }
                    return res.status(200).send({ message: 'Image uploaded successfully', imageUrl: result.secure_url, hotel: updatedHotel })
                })
                .catch(err => {
                    console.error('Error updating hotel:', err)
                    return res.status(500).send({ message: 'Error updating hotel' })
                })
            }
        )
        stream.end(req.file.buffer)
    } catch (error) {
        console.error('Error uploading image:', error)
        return res.status(500).send({ message: 'Error uploading image' })
    }
})




export default api