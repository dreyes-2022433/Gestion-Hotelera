import Event from "./Events.model.js"
import User from "../user/user.model.js"
import Hotel from "../Hotel/hotel.model.js"

export const getEvents = async(req, res)=>{
    try {
        const events = await Event.find()

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
        const { eventType, hotel, booker, guests } = req.body

        const addEvent = new Event(
            {
                eventType,
                hotel,
                booker,
                guests
            }
        )

        hotelExist = await Hotel.findById(hotel)
        
        if(!hotelExist){
            return res.status(404).send({
                status: false,
                message: 'Hotel not found'
            })
        }

        bookerExist = await User.findById(booker)

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
        const { idEvent } = req.params
        const { name, price, description } = req.body

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                $push: {
                    services: { name, price, description }
                }
            },
            {
                new: true,
                runValidators: true
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

export const deleteEvent = async(req, res)=>{
    const { idEvent } = req.params

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
            message: 'Event desactivated successfully',
            event
        }
    )
}

export const updateEvent = async(req, res) => {
    try {
        const { idEvent } = req.params
        const { eventType, hotel, booker, guests, status } = req.body

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                eventType,
                hotel,
                booker,
                guests,
                status
            },
            {
                new: true,
            }
        )

        hotelExist = await Hotel.findById(hotel)
        
        if(!hotelExist){
            return res.status(404).send({
                status: false,
                message: 'Hotel not found'
            })
        }

        bookerExist = await User.findById(booker)

        if(!bookerExist){
            return res.status(404).send({
                status: false,
                message: 'Booker not found'
            })
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