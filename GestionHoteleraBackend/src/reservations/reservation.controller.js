import { generateFacture } from '../Facture/facture.controller.js'
import Reservation from './reservation.model.js'
import User from '../user/user.model.js'

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
    const { limit, skip } = req.query
    try {
        const reservations = await Reservation.find()
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email') 
    
        if (reservations.length === 0) {
            return res.send({
                success: false,
                message: 'No reservations found'
            })
        }
                if(reservations.endDate == Date.now()){
                generateFacture({user: reservations.user, hotel: reservations.hotel,
                    description: 'Reservation', serviceId: reservations.services._id, serviceType: 
                    'Reservation', event: null, room: reservations.room,
                    totaladditionalServices: 0,
                    totalAmount: 0, totalValue: 0,
                    paymentStatus: 'Pending'})
            } return res.send({
            success: true,
            message: 'Reservations found',
            total: reservations.length,
            reservations
        })
        }catch (err) {
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