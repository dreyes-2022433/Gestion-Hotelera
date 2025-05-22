import { Router } from "express"
import { addEvent, addService, deleteEvent, deleteService, getEvents, updateEvent } from "./events.controller.js"
import { validAddEvent, validAddService, validDeleteEvent, validDeleteService, validUpdateEvent } from "../../helpers/validators.js"


const api = Router()

api.get(
    '/getEvents',
    getEvents
)

api.post(
    '/addEvent',
    [
        validAddEvent
    ],
    addEvent
)

api.post(
    '/addService',
    [
        validAddService
    ],
    addService
)

api.delete(
    '/deleteService',
    [
        validDeleteService
    ],
    deleteService
)

api.delete(
    '/deleteEvent',
    [
        validDeleteEvent
    ],
    deleteEvent
)

api.put(
    '/udpateEvent',
    [
        validUpdateEvent
    ],
    updateEvent
)

export default api  