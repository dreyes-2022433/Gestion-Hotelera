import Room from './room.model.js' 

//Utilidades
const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id) //Validar si el id es un ObjectId de MongoDB
const allowedUpdates = [ 'number', 'hotel', 'capacity', 'reserved', 'stars', 'price', 'description' ] //Propiedades que se pueden actualizar

const handleError = (res, err, status = 500) => {
    return res.status(status).json({
        success: false, 
        message: status === 500 ? 'Server Error' : err.message,
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
}

const sendResponse = (res, data, status = 200) => {
    res.status(status).json({
        success: true, 
        data
    })
}

//Crear una habitación
export const createRoom = async (req, res) => {
  try {
    const { number, hotel, capacity, reserved, stars, price, description } = req.body

    if (!isValidId(hotel)) {
      return handleError(res, new Error('Invalid hotel ID'), 400)
    }

    const newRoom = new Room({
      number, 
      hotel, 
      capacity, 
      reserved, 
      stars, 
      price, 
      description
    })

    await newRoom.save()
    await newRoom.populate('hotel')

    sendResponse(res, newRoom, 201)
  } catch (err) {
    // Imprime el error completo en la consola
    console.error("Error creating room:", err)  // Aquí imprimimos el error completo para verlo
    handleError(res, err)
  }
}


//Obtener todas las habitaciones
export const getRooms = async (req, res) => {
    try {
        const { page = 1, limit = 10} = req.query //Paginación
        const skip = (page - 1) * limit //Número de documentos a omitir

        const query = hotel && isValidId(hotel) ? { hotel } : {}

        const rooms = await Room.find(query) //Buscar habitaciones por hotel
            .populate('hotel', 'name location -_id') //Solo campos específicos del hotel
            .skip(skip)
            .limit(parseInt(limit)) //Limitar el número de resultados por página
            .lean() //Convertir a objetos literales para mejor rendimiento

            const total = await Room.countDocuments(query)

            sendResponse(res, {
                rooms,
                pagination: {
                    currentPage: page, 
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    limit: parseInt(limit)
                }
            })
    } catch (err) {
        handleError(res, err)
    }
}

export const getRoomById = async (req, res) => {
    try {
        if (!isValidId(req.params.id)) {
            return handleError(res, new Error('Invalid room ID'), 400)
        }

        const room = await Room.findById(req.params.id)
        .populate('hotel', 'name location -_id')
        .lean()

        if (!room) return handleError(res, new Error('Room not found'), 404)
        sendResponse(res, room)
    } catch (err) {
        handleError(res, err)
    }
}

// Actualizar una habitación por ID
export const updateRoom = async (req, res) => {
    try {
      if (!isValidId(req.params.id)) {
        return handleError(res, new Error('Invalid room ID'), 400)
      }
  
      const updates = Object.keys(req.body)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj, key) => {
          obj[key] = req.body[key]
          return obj
        }, {})
  
      if (Object.keys(updates).length === 0) {
        return handleError(res, new Error('No valid fields to update'), 400)
      }
  
      if (updates.hotel && !isValidId(updates.hotel)) {
        return handleError(res, new Error('Invalid hotel ID'), 400)
      }
  
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).populate('hotel', 'name location -_id')
  
      if (!updatedRoom) return handleError(res, new Error('Room not found'), 404)
      sendResponse(res, updatedRoom)
    } catch (err) {
      handleError(res, err)
    }
  }
  
  // Eliminar una habitación por ID
  export const deleteRoom = async (req, res) => {
    try {
      if (!isValidId(req.params.id)) {
        return handleError(res, new Error('Invalid room ID'), 400)
      }
  
      const deletedRoom = await Room.findByIdAndDelete(req.params.id)
      if (!deletedRoom) return handleError(res, new Error('Room not found'), 404)
  
      sendResponse(res, { message: 'Room deleted successfully' })
    } catch (err) {
      handleError(res, err)
    }
  }