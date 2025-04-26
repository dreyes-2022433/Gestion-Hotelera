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

        const event = new Event(
            {
                eventType,
                hotel,
                booker,
                guests
            }
        )

        await event.save()

        return res.status(201).send(
            {
                status: true,
                message: 'Event booked successfully',
                event
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

    event.status = false
    event.save

    return res.send(
        {
            status: true,
            message: 'Evente desactivated successfully',
            event
        }
    )
}

export const updateEvent = async(req, res) => {
    try {
        const { idEvent } = req.params
        const { eventType, hotel, room, booker, status } = req.body

        const updatedEvent = await Event.findByIdAndUpdate(
            idEvent,
            {
                eventType,
                hotel,
                room,
                guests,
                status
            },
            {
                new: true,
            }
        )

        if (!updatedEvent) {
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