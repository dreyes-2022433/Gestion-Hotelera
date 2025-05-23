import { generateFacture } from '../Facture/facture.controller.js'
import Reservation from './reservation.model.js'
import User from '../user/user.model.js'
import Facture from '../Facture/facture.model.js'

export const registerReservation = async (req, res) => {
    try {
        let data = req.body
    
        let services = []
        for (let i = 0; i < Object.keys(req.body).length; i++) {
            if (req.body[`services[${i}].name`] && req.body[`services[${i}].description`] && req.body[`services[${i}].price`]) {
            services.push({
                name: req.body[`services[${i}].name`],
                description: req.body[`services[${i}].description`],
                price: req.body[`services[${i}].price`]
            })
            }
        }
        data.services = services
    
        let reservation = new Reservation(data)
        await reservation.save()
    
        return res.send({
            message: `Registered successfully, the added Reservation is: ${reservation.type}`
        })
        } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
            message: 'General Error with registering Reservation',
            err
            }
        )
    }
}

export const getAllReservations = async (req, res) => {
    const { limit = 10, skip = 0 } = req.query

    try {
        const reservations = await Reservation.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('user', 'name email')
            .populate('hotel', 'name')
            .populate('room', 'number')

        if (!reservations.length) {
            return res.send({
                success: false,
                message: 'No reservations found'
            })
        }

        for (let reservation of reservations) {
            const endDateTime = new Date(reservation.endDate).getTime()
            const now = Date.now()

            console.log(`Verificando reservación ${reservation._id}`)
            console.log(`EndDate: ${reservation.endDate}, Timestamp: ${endDateTime}, Now: ${now}`)

            if (endDateTime <= now) {
                const alreadyExists = await Facture.findOne({
                    serviceId: reservation._id,
                    serviceType: 'Reservation'
                });

                if (alreadyExists) {
                    console.log(`Factura ya existe para la reservación ${reservation._id}`)
                    continue;
                }

                console.log(`Generando factura para la reservación ${reservation._id}`)

                const totaladditionalServices = reservation.services.reduce(
                    (acc, service) => acc + (service.price || 0),
                    0
                )

                const totalValue = 0;
                const totalAmount = totaladditionalServices + totalValue

                try {
                    await generateFacture({
                        user: reservation.user,
                        hotel: reservation.hotel,
                        description: 'Reservation',
                        serviceId: reservation._id,
                        serviceType: 'Reservation',
                        event: null,
                        room: reservation.room,
                        totaladditionalServices,
                        totalValue,
                        totalAmount,
                        paymentStatus: 'Pending'
                    })
                    console.log('Factura generada con éxito')
                } catch (err) {
                    console.error('Error al generar factura:', err)
                }
            }
        }

        return res.send({
            success: true,
            message: 'Reservations found',
            total: reservations.length,
            reservations
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General Error',
            err
        })
    }
}

export const getMyReservations = async (req, res) => {
    const { userId } = req.params
    try {
        const reservations = await Reservation.find({ user: userId }).populate('user', 'name email')
        if (reservations.length === 0) {
            return res.status(404).send({
            success: false,
            message: 'No reservations found for this user'
            })
        }
        return res.send({
            success: true,
            message: 'Reservations found',
            reservations
        })
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

export const updateReservation = async (req, res) => {
    const { id } = req.params
    const { ...data } = req.body
  
    try {
        const reservation = await Reservation.findById(id)
    
        if (!reservation) {
            return res.status(404).send({
            success: false,
            message: 'Reservation not found'
            })
        }

        if (req.body['services[0].name'] && req.body['services[0].description']) {
            let services = []
            let i = 0
    
            while (req.body[`services[${i}].name`]) {
            services.push({
                name: req.body[`services[${i}].name`],
                description: req.body[`services[${i}].description`],
                price: req.body[`services[${i}].price`]
            })
            i++
            }
    
            data.services = services
        }
        const updatedReservation = await Reservation.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    
        return res.send({
            success: true,
            message: 'Reservation updated successfully',
            updatedReservation
        })
        } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
            success: false,
            message: 'Error updating reservation',
            err
            }
        )
    }
}
  
export const deleteReservation = async (req, res) => {
    const { id } = req.params
    try {
        const reservation = await Reservation.findById(id)
            if (!reservation) {
                return res.status(404).send({
                success: false,
                message: 'Reservation not found'
                }
            )
        }
        await Reservation.findByIdAndDelete(id)
        return res.send({
            success: true,
            message: 'Reservation deleted successfully'
        })
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

export const getUsersReservations = async(req, res) => {
    try {
        const { idUser } = req.body

        const user = await User.findById(idUser)

        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reservations = await Reservation.find({ user: idUser, endDate: { $gte: today } }).populate('user', 'name email')

        if (reservations.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'No reservations found for this user'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Reservations found',
                reservations
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