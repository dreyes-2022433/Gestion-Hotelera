import Event from "./Events.model.js"
import User from "../user/user.model.js"
import Hotel from "../Hotel/hotel.model.js"
import { generateFacture } from "../Facture/facture.controller.js"

export const getEvents = async(req, res)=>{
    try {
        const events = await Event.find()
        if(events.endDate == Date.now()){
            generateFacture({})
        }
        return res.send(
            {
                success: true,
                message: 'Events found',
                events
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                status: false,
                message: 'General Error',
                err
            }
        )
    }
}





export const addEvent = async(req, res)=>{
    try {
        const { eventType, hotel, booker, guests, initialDate, endDate, initialValue } = req.body

        const addEvent = new Event(
            {
                eventType,
                hotel,
                booker,
                guests,
                initialDate,
                endDate,
                initialValue
            }
        )

        const hotelExist = await Hotel.findById(hotel)
        
        if(!hotelExist){
            return res.status(404).send({
                status: false,
                message: 'Hotel not found'
            })
        }

        const bookerExist = await User.findById(booker)

        if(!bookerExist){
            return res.status(404).send({
                status: false,
                message: 'Booker not found'
            })
        }

        await addEvent.save()

        return res.send(
            {
                status: true,
                message: 'Event booked successfully',
                addEvent
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                status: false,
                message: 'General Error',
                err
            }
        )
    }
}

export const addService = async(req, res)=>{
    try {
        const { idEvent, name, price, description } = req.body

        const serviceName = name.toLowerCase()

        const event = await Event.findById(idEvent)
        
        if (!event) {
            return res.status(404).send({
                status: false,
                message: 'Event not found'
            })
        }

        const existingService = event.services.find(services => services.name === serviceName)

        if (existingService) {
            return res.status(400).send({
                status: false,
                message: 'Service with this name already exists'
            })
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                $push: {
                    services: { name: serviceName, price, description }
                }
            },
            {
                new: true
            }
        )

        if (!updatedEvent){
            return res.status(404).send(
                {
                    status: false,
                    message: 'Event not found'
                }
            )
        }

        return res.send(
            {
                status: true,
                message: 'Service added successfully',
                updatedEvent
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                status: false,
                message: 'General Error',
                err
            }
        )
    }
}

export const deleteService = async(req, res) =>{
    try {
        const { idEvent, name } = req.body

        const serviceName = name.toLowerCase()

        const event = await Event.findById(idEvent)

        if(!event){
            return res.status(404).send({
                status: false,
                message: 'General Error',
                err
            })
        }

        const existingService = event.services.find(services => services.name === serviceName)

        if(!existingService){
            return res.status(500).send({
                status: false,
                message: 'Service not found'
            })
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                $pull: {
                    services: { name: serviceName }
                }
            },
            {
                new: true
            }
        )

        return res.send({
            success: true,
            message: 'Service deleted successfully',
            updatedEvent
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            status: false,
            message: 'General Error',
            err
        })
    }
}

export const deleteEvent = async(req, res)=>{
    const { idEvent } = req.body

    const event = await Event.findById(idEvent)

    if(!event){
        return res.status(404).send(
            {
                status: false,
                message: 'Event not found'
            }
        )
    }

    await Event.findByIdAndDelete(idEvent)

    return res.send(
        {
            status: true,
            message: 'Event deleted successfully',
            event
        }
    )
}

export const updateEvent = async(req, res) => {
    try {
        const { idEvent, eventType, hotel, booker, guests, status, initialDate, endDate, initialValue } = req.body

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                eventType,
                hotel,
                booker,
                guests,
                status,
                initialDate,
                endDate,
                initialValue
            },
            {
                new: true,
            }
        )

        if(hotel){
            const hotelExist = await Hotel.findById(hotel)
        
            if(!hotelExist){
                return res.status(404).send({
                    status: false,
                    message: 'Hotel not found'
                })
            }
        }

        if(booker){
            const bookerExist = await User.findById(booker)

            if(!bookerExist){
                return res.status(404).send({
                    status: false,
                    message: 'Booker not found'
                })
            }
        }

        if(!updatedEvent){
            return res.status(404).send({
                status: false,
                message: 'Event not found'
            })
        }

        return res.send({
            status: true,
            message: 'Event updated successfully',
            event: updatedEvent
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            status: false,
            message: 'General Error',
            err
        })
    }
}