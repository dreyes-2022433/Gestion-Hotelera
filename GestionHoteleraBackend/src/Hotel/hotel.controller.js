import Hotel from '../Hotel/hotel.model.js'

//Crear Hotel
export const hotelRegister = async(req, res)=>{
    try {
        let data = req.body
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send(
            {
                message: `Registred successfully, the added Hotel is: ${hotel.name}`
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General Error with registering Hotel',
                err
            }
        )
    }
}

//Obtener los Hoteles
export const getAllHotels = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const hotels = await Hotel.find()
            .skip(skip)
            .limit(limit)
        if(hotels.length === 0){
            return res.send(
                {
                    success: false,
                    message: 'Hotels not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Hotels found',
                total: hotels.length,
                hotels
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

//Buscar 1 Hotel
export const getOneHotel = async(req, res)=>{
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        if(!hotel) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not Found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Hotel Found',
                hotel
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Buscar Hotel por nombre
export const getHotelByName = async(req, res)=>{
    const { name } = req.params
    try {
        const hotel = await Hotel.find(
            {
                name: { $regex: name, $options: 'i'}
            }
        )
        if(hotel.length === 0){
            return res.status(400).send(
                {
                    success: false,
                    message: 'No Hotel found with that name',
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Hotel(s) found.',
                hotels: hotel
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}

//Actualizar Hotel
export const updateHotel = async(req, res)=>{
    const { id } = req.params
    const { ...data } = req.body
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!updateHotel){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Hotel not found, not updated'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Hotel updated successfully',
                updateHotel
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error when adding Hotel',
                err
            }
        )
    }
}

//Eliminar Hotel
export const deleteHotel = async(req, res)=>{
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        if(!hotel) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found'
            }
        )
        await hotel.save()
        await Hotel.findByIdAndDelete(id)
        return res.send(
            {
                success: true,
                message: 'Hotel deleted successfully'
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
    }
}